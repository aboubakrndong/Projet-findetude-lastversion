package com.atos.operatappli.web.rest;

import com.atos.operatappli.OperatappliApp;
import com.atos.operatappli.domain.Taches;
import com.atos.operatappli.repository.TachesRepository;
import com.atos.operatappli.repository.search.TachesSearchRepository;
import com.atos.operatappli.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static com.atos.operatappli.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link TachesResource} REST controller.
 */
@SpringBootTest(classes = OperatappliApp.class)
public class TachesResourceIT {

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATEDEDEBUT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATEDEDEBUT = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATEDEFIN = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATEDEFIN = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private TachesRepository tachesRepository;

    @Mock
    private TachesRepository tachesRepositoryMock;

    /**
     * This repository is mocked in the com.atos.operatappli.repository.search test package.
     *
     * @see com.atos.operatappli.repository.search.TachesSearchRepositoryMockConfiguration
     */
    @Autowired
    private TachesSearchRepository mockTachesSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restTachesMockMvc;

    private Taches taches;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TachesResource tachesResource = new TachesResource(tachesRepository, mockTachesSearchRepository);
        this.restTachesMockMvc = MockMvcBuilders.standaloneSetup(tachesResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Taches createEntity(EntityManager em) {
        Taches taches = new Taches()
            .type(DEFAULT_TYPE)
            .datededebut(DEFAULT_DATEDEDEBUT)
            .datedefin(DEFAULT_DATEDEFIN);
        return taches;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Taches createUpdatedEntity(EntityManager em) {
        Taches taches = new Taches()
            .type(UPDATED_TYPE)
            .datededebut(UPDATED_DATEDEDEBUT)
            .datedefin(UPDATED_DATEDEFIN);
        return taches;
    }

    @BeforeEach
    public void initTest() {
        taches = createEntity(em);
    }

    @Test
    @Transactional
    public void createTaches() throws Exception {
        int databaseSizeBeforeCreate = tachesRepository.findAll().size();

        // Create the Taches
        restTachesMockMvc.perform(post("/api/taches")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(taches)))
            .andExpect(status().isCreated());

        // Validate the Taches in the database
        List<Taches> tachesList = tachesRepository.findAll();
        assertThat(tachesList).hasSize(databaseSizeBeforeCreate + 1);
        Taches testTaches = tachesList.get(tachesList.size() - 1);
        assertThat(testTaches.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testTaches.getDatededebut()).isEqualTo(DEFAULT_DATEDEDEBUT);
        assertThat(testTaches.getDatedefin()).isEqualTo(DEFAULT_DATEDEFIN);

        // Validate the Taches in Elasticsearch
        verify(mockTachesSearchRepository, times(1)).save(testTaches);
    }

    @Test
    @Transactional
    public void createTachesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tachesRepository.findAll().size();

        // Create the Taches with an existing ID
        taches.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTachesMockMvc.perform(post("/api/taches")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(taches)))
            .andExpect(status().isBadRequest());

        // Validate the Taches in the database
        List<Taches> tachesList = tachesRepository.findAll();
        assertThat(tachesList).hasSize(databaseSizeBeforeCreate);

        // Validate the Taches in Elasticsearch
        verify(mockTachesSearchRepository, times(0)).save(taches);
    }


    @Test
    @Transactional
    public void getAllTaches() throws Exception {
        // Initialize the database
        tachesRepository.saveAndFlush(taches);

        // Get all the tachesList
        restTachesMockMvc.perform(get("/api/taches?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(taches.getId().intValue())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].datededebut").value(hasItem(DEFAULT_DATEDEDEBUT.toString())))
            .andExpect(jsonPath("$.[*].datedefin").value(hasItem(DEFAULT_DATEDEFIN.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllTachesWithEagerRelationshipsIsEnabled() throws Exception {
        TachesResource tachesResource = new TachesResource(tachesRepositoryMock, mockTachesSearchRepository);
        when(tachesRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restTachesMockMvc = MockMvcBuilders.standaloneSetup(tachesResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restTachesMockMvc.perform(get("/api/taches?eagerload=true"))
        .andExpect(status().isOk());

        verify(tachesRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllTachesWithEagerRelationshipsIsNotEnabled() throws Exception {
        TachesResource tachesResource = new TachesResource(tachesRepositoryMock, mockTachesSearchRepository);
            when(tachesRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restTachesMockMvc = MockMvcBuilders.standaloneSetup(tachesResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restTachesMockMvc.perform(get("/api/taches?eagerload=true"))
        .andExpect(status().isOk());

            verify(tachesRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getTaches() throws Exception {
        // Initialize the database
        tachesRepository.saveAndFlush(taches);

        // Get the taches
        restTachesMockMvc.perform(get("/api/taches/{id}", taches.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(taches.getId().intValue()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.datededebut").value(DEFAULT_DATEDEDEBUT.toString()))
            .andExpect(jsonPath("$.datedefin").value(DEFAULT_DATEDEFIN.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTaches() throws Exception {
        // Get the taches
        restTachesMockMvc.perform(get("/api/taches/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTaches() throws Exception {
        // Initialize the database
        tachesRepository.saveAndFlush(taches);

        int databaseSizeBeforeUpdate = tachesRepository.findAll().size();

        // Update the taches
        Taches updatedTaches = tachesRepository.findById(taches.getId()).get();
        // Disconnect from session so that the updates on updatedTaches are not directly saved in db
        em.detach(updatedTaches);
        updatedTaches
            .type(UPDATED_TYPE)
            .datededebut(UPDATED_DATEDEDEBUT)
            .datedefin(UPDATED_DATEDEFIN);

        restTachesMockMvc.perform(put("/api/taches")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTaches)))
            .andExpect(status().isOk());

        // Validate the Taches in the database
        List<Taches> tachesList = tachesRepository.findAll();
        assertThat(tachesList).hasSize(databaseSizeBeforeUpdate);
        Taches testTaches = tachesList.get(tachesList.size() - 1);
        assertThat(testTaches.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testTaches.getDatededebut()).isEqualTo(UPDATED_DATEDEDEBUT);
        assertThat(testTaches.getDatedefin()).isEqualTo(UPDATED_DATEDEFIN);

        // Validate the Taches in Elasticsearch
        verify(mockTachesSearchRepository, times(1)).save(testTaches);
    }

    @Test
    @Transactional
    public void updateNonExistingTaches() throws Exception {
        int databaseSizeBeforeUpdate = tachesRepository.findAll().size();

        // Create the Taches

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTachesMockMvc.perform(put("/api/taches")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(taches)))
            .andExpect(status().isBadRequest());

        // Validate the Taches in the database
        List<Taches> tachesList = tachesRepository.findAll();
        assertThat(tachesList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Taches in Elasticsearch
        verify(mockTachesSearchRepository, times(0)).save(taches);
    }

    @Test
    @Transactional
    public void deleteTaches() throws Exception {
        // Initialize the database
        tachesRepository.saveAndFlush(taches);

        int databaseSizeBeforeDelete = tachesRepository.findAll().size();

        // Delete the taches
        restTachesMockMvc.perform(delete("/api/taches/{id}", taches.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Taches> tachesList = tachesRepository.findAll();
        assertThat(tachesList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Taches in Elasticsearch
        verify(mockTachesSearchRepository, times(1)).deleteById(taches.getId());
    }

    @Test
    @Transactional
    public void searchTaches() throws Exception {
        // Initialize the database
        tachesRepository.saveAndFlush(taches);
        when(mockTachesSearchRepository.search(queryStringQuery("id:" + taches.getId())))
            .thenReturn(Collections.singletonList(taches));
        // Search the taches
        restTachesMockMvc.perform(get("/api/_search/taches?query=id:" + taches.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(taches.getId().intValue())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE)))
            .andExpect(jsonPath("$.[*].datededebut").value(hasItem(DEFAULT_DATEDEDEBUT.toString())))
            .andExpect(jsonPath("$.[*].datedefin").value(hasItem(DEFAULT_DATEDEFIN.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Taches.class);
        Taches taches1 = new Taches();
        taches1.setId(1L);
        Taches taches2 = new Taches();
        taches2.setId(taches1.getId());
        assertThat(taches1).isEqualTo(taches2);
        taches2.setId(2L);
        assertThat(taches1).isNotEqualTo(taches2);
        taches1.setId(null);
        assertThat(taches1).isNotEqualTo(taches2);
    }
}
