package com.atos.operatappli.web.rest;

import com.atos.operatappli.OperatappliApp;
import com.atos.operatappli.domain.Alertes;
import com.atos.operatappli.repository.AlertesRepository;
import com.atos.operatappli.repository.search.AlertesSearchRepository;
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
 * Integration tests for the {@Link AlertesResource} REST controller.
 */
@SpringBootTest(classes = OperatappliApp.class)
public class AlertesResourceIT {

    private static final String DEFAULT_DESTINATAIRE = "AAAAAAAAAA";
    private static final String UPDATED_DESTINATAIRE = "BBBBBBBBBB";

    private static final String DEFAULT_DETAILS = "AAAAAAAAAA";
    private static final String UPDATED_DETAILS = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private AlertesRepository alertesRepository;

    @Mock
    private AlertesRepository alertesRepositoryMock;

    /**
     * This repository is mocked in the com.atos.operatappli.repository.search test package.
     *
     * @see com.atos.operatappli.repository.search.AlertesSearchRepositoryMockConfiguration
     */
    @Autowired
    private AlertesSearchRepository mockAlertesSearchRepository;

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

    private MockMvc restAlertesMockMvc;

    private Alertes alertes;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AlertesResource alertesResource = new AlertesResource(alertesRepository, mockAlertesSearchRepository);
        this.restAlertesMockMvc = MockMvcBuilders.standaloneSetup(alertesResource)
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
    public static Alertes createEntity(EntityManager em) {
        Alertes alertes = new Alertes()
            .destinataire(DEFAULT_DESTINATAIRE)
            .details(DEFAULT_DETAILS)
            .date(DEFAULT_DATE);
        return alertes;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Alertes createUpdatedEntity(EntityManager em) {
        Alertes alertes = new Alertes()
            .destinataire(UPDATED_DESTINATAIRE)
            .details(UPDATED_DETAILS)
            .date(UPDATED_DATE);
        return alertes;
    }

    @BeforeEach
    public void initTest() {
        alertes = createEntity(em);
    }

    @Test
    @Transactional
    public void createAlertes() throws Exception {
        int databaseSizeBeforeCreate = alertesRepository.findAll().size();

        // Create the Alertes
        restAlertesMockMvc.perform(post("/api/alertes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(alertes)))
            .andExpect(status().isCreated());

        // Validate the Alertes in the database
        List<Alertes> alertesList = alertesRepository.findAll();
        assertThat(alertesList).hasSize(databaseSizeBeforeCreate + 1);
        Alertes testAlertes = alertesList.get(alertesList.size() - 1);
        assertThat(testAlertes.getDestinataire()).isEqualTo(DEFAULT_DESTINATAIRE);
        assertThat(testAlertes.getDetails()).isEqualTo(DEFAULT_DETAILS);
        assertThat(testAlertes.getDate()).isEqualTo(DEFAULT_DATE);

        // Validate the Alertes in Elasticsearch
        verify(mockAlertesSearchRepository, times(1)).save(testAlertes);
    }

    @Test
    @Transactional
    public void createAlertesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = alertesRepository.findAll().size();

        // Create the Alertes with an existing ID
        alertes.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAlertesMockMvc.perform(post("/api/alertes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(alertes)))
            .andExpect(status().isBadRequest());

        // Validate the Alertes in the database
        List<Alertes> alertesList = alertesRepository.findAll();
        assertThat(alertesList).hasSize(databaseSizeBeforeCreate);

        // Validate the Alertes in Elasticsearch
        verify(mockAlertesSearchRepository, times(0)).save(alertes);
    }


    @Test
    @Transactional
    public void getAllAlertes() throws Exception {
        // Initialize the database
        alertesRepository.saveAndFlush(alertes);

        // Get all the alertesList
        restAlertesMockMvc.perform(get("/api/alertes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(alertes.getId().intValue())))
            .andExpect(jsonPath("$.[*].destinataire").value(hasItem(DEFAULT_DESTINATAIRE.toString())))
            .andExpect(jsonPath("$.[*].details").value(hasItem(DEFAULT_DETAILS.toString())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllAlertesWithEagerRelationshipsIsEnabled() throws Exception {
        AlertesResource alertesResource = new AlertesResource(alertesRepositoryMock, mockAlertesSearchRepository);
        when(alertesRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restAlertesMockMvc = MockMvcBuilders.standaloneSetup(alertesResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restAlertesMockMvc.perform(get("/api/alertes?eagerload=true"))
        .andExpect(status().isOk());

        verify(alertesRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllAlertesWithEagerRelationshipsIsNotEnabled() throws Exception {
        AlertesResource alertesResource = new AlertesResource(alertesRepositoryMock, mockAlertesSearchRepository);
            when(alertesRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restAlertesMockMvc = MockMvcBuilders.standaloneSetup(alertesResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restAlertesMockMvc.perform(get("/api/alertes?eagerload=true"))
        .andExpect(status().isOk());

            verify(alertesRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getAlertes() throws Exception {
        // Initialize the database
        alertesRepository.saveAndFlush(alertes);

        // Get the alertes
        restAlertesMockMvc.perform(get("/api/alertes/{id}", alertes.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(alertes.getId().intValue()))
            .andExpect(jsonPath("$.destinataire").value(DEFAULT_DESTINATAIRE.toString()))
            .andExpect(jsonPath("$.details").value(DEFAULT_DETAILS.toString()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAlertes() throws Exception {
        // Get the alertes
        restAlertesMockMvc.perform(get("/api/alertes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAlertes() throws Exception {
        // Initialize the database
        alertesRepository.saveAndFlush(alertes);

        int databaseSizeBeforeUpdate = alertesRepository.findAll().size();

        // Update the alertes
        Alertes updatedAlertes = alertesRepository.findById(alertes.getId()).get();
        // Disconnect from session so that the updates on updatedAlertes are not directly saved in db
        em.detach(updatedAlertes);
        updatedAlertes
            .destinataire(UPDATED_DESTINATAIRE)
            .details(UPDATED_DETAILS)
            .date(UPDATED_DATE);

        restAlertesMockMvc.perform(put("/api/alertes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAlertes)))
            .andExpect(status().isOk());

        // Validate the Alertes in the database
        List<Alertes> alertesList = alertesRepository.findAll();
        assertThat(alertesList).hasSize(databaseSizeBeforeUpdate);
        Alertes testAlertes = alertesList.get(alertesList.size() - 1);
        assertThat(testAlertes.getDestinataire()).isEqualTo(UPDATED_DESTINATAIRE);
        assertThat(testAlertes.getDetails()).isEqualTo(UPDATED_DETAILS);
        assertThat(testAlertes.getDate()).isEqualTo(UPDATED_DATE);

        // Validate the Alertes in Elasticsearch
        verify(mockAlertesSearchRepository, times(1)).save(testAlertes);
    }

    @Test
    @Transactional
    public void updateNonExistingAlertes() throws Exception {
        int databaseSizeBeforeUpdate = alertesRepository.findAll().size();

        // Create the Alertes

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAlertesMockMvc.perform(put("/api/alertes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(alertes)))
            .andExpect(status().isBadRequest());

        // Validate the Alertes in the database
        List<Alertes> alertesList = alertesRepository.findAll();
        assertThat(alertesList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Alertes in Elasticsearch
        verify(mockAlertesSearchRepository, times(0)).save(alertes);
    }

    @Test
    @Transactional
    public void deleteAlertes() throws Exception {
        // Initialize the database
        alertesRepository.saveAndFlush(alertes);

        int databaseSizeBeforeDelete = alertesRepository.findAll().size();

        // Delete the alertes
        restAlertesMockMvc.perform(delete("/api/alertes/{id}", alertes.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Alertes> alertesList = alertesRepository.findAll();
        assertThat(alertesList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Alertes in Elasticsearch
        verify(mockAlertesSearchRepository, times(1)).deleteById(alertes.getId());
    }

    @Test
    @Transactional
    public void searchAlertes() throws Exception {
        // Initialize the database
        alertesRepository.saveAndFlush(alertes);
        when(mockAlertesSearchRepository.search(queryStringQuery("id:" + alertes.getId())))
            .thenReturn(Collections.singletonList(alertes));
        // Search the alertes
        restAlertesMockMvc.perform(get("/api/_search/alertes?query=id:" + alertes.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(alertes.getId().intValue())))
            .andExpect(jsonPath("$.[*].destinataire").value(hasItem(DEFAULT_DESTINATAIRE)))
            .andExpect(jsonPath("$.[*].details").value(hasItem(DEFAULT_DETAILS)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Alertes.class);
        Alertes alertes1 = new Alertes();
        alertes1.setId(1L);
        Alertes alertes2 = new Alertes();
        alertes2.setId(alertes1.getId());
        assertThat(alertes1).isEqualTo(alertes2);
        alertes2.setId(2L);
        assertThat(alertes1).isNotEqualTo(alertes2);
        alertes1.setId(null);
        assertThat(alertes1).isNotEqualTo(alertes2);
    }
}
