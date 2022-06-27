package com.atos.operatappli.web.rest;

import com.atos.operatappli.OperatappliApp;
import com.atos.operatappli.domain.Bts;
import com.atos.operatappli.repository.BtsRepository;
import com.atos.operatappli.repository.search.BtsSearchRepository;
import com.atos.operatappli.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
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
 * Integration tests for the {@Link BtsResource} REST controller.
 */
@SpringBootTest(classes = OperatappliApp.class)
public class BtsResourceIT {

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_PUISSANCE = "AAAAAAAAAA";
    private static final String UPDATED_PUISSANCE = "BBBBBBBBBB";

    private static final String DEFAULT_ETAT = "AAAAAAAAAA";
    private static final String UPDATED_ETAT = "BBBBBBBBBB";

    @Autowired
    private BtsRepository btsRepository;

    /**
     * This repository is mocked in the com.atos.operatappli.repository.search test package.
     *
     * @see com.atos.operatappli.repository.search.BtsSearchRepositoryMockConfiguration
     */
    @Autowired
    private BtsSearchRepository mockBtsSearchRepository;

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

    private MockMvc restBtsMockMvc;

    private Bts bts;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BtsResource btsResource = new BtsResource(btsRepository, mockBtsSearchRepository);
        this.restBtsMockMvc = MockMvcBuilders.standaloneSetup(btsResource)
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
    public static Bts createEntity(EntityManager em) {
        Bts bts = new Bts()
            .type(DEFAULT_TYPE)
            .puissance(DEFAULT_PUISSANCE)
            .etat(DEFAULT_ETAT);
        return bts;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Bts createUpdatedEntity(EntityManager em) {
        Bts bts = new Bts()
            .type(UPDATED_TYPE)
            .puissance(UPDATED_PUISSANCE)
            .etat(UPDATED_ETAT);
        return bts;
    }

    @BeforeEach
    public void initTest() {
        bts = createEntity(em);
    }

    @Test
    @Transactional
    public void createBts() throws Exception {
        int databaseSizeBeforeCreate = btsRepository.findAll().size();

        // Create the Bts
        restBtsMockMvc.perform(post("/api/bts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bts)))
            .andExpect(status().isCreated());

        // Validate the Bts in the database
        List<Bts> btsList = btsRepository.findAll();
        assertThat(btsList).hasSize(databaseSizeBeforeCreate + 1);
        Bts testBts = btsList.get(btsList.size() - 1);
        assertThat(testBts.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testBts.getPuissance()).isEqualTo(DEFAULT_PUISSANCE);
        assertThat(testBts.getEtat()).isEqualTo(DEFAULT_ETAT);

        // Validate the Bts in Elasticsearch
        verify(mockBtsSearchRepository, times(1)).save(testBts);
    }

    @Test
    @Transactional
    public void createBtsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = btsRepository.findAll().size();

        // Create the Bts with an existing ID
        bts.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBtsMockMvc.perform(post("/api/bts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bts)))
            .andExpect(status().isBadRequest());

        // Validate the Bts in the database
        List<Bts> btsList = btsRepository.findAll();
        assertThat(btsList).hasSize(databaseSizeBeforeCreate);

        // Validate the Bts in Elasticsearch
        verify(mockBtsSearchRepository, times(0)).save(bts);
    }


    @Test
    @Transactional
    public void getAllBts() throws Exception {
        // Initialize the database
        btsRepository.saveAndFlush(bts);

        // Get all the btsList
        restBtsMockMvc.perform(get("/api/bts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bts.getId().intValue())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].puissance").value(hasItem(DEFAULT_PUISSANCE.toString())))
            .andExpect(jsonPath("$.[*].etat").value(hasItem(DEFAULT_ETAT.toString())));
    }
    
    @Test
    @Transactional
    public void getBts() throws Exception {
        // Initialize the database
        btsRepository.saveAndFlush(bts);

        // Get the bts
        restBtsMockMvc.perform(get("/api/bts/{id}", bts.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(bts.getId().intValue()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.puissance").value(DEFAULT_PUISSANCE.toString()))
            .andExpect(jsonPath("$.etat").value(DEFAULT_ETAT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingBts() throws Exception {
        // Get the bts
        restBtsMockMvc.perform(get("/api/bts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBts() throws Exception {
        // Initialize the database
        btsRepository.saveAndFlush(bts);

        int databaseSizeBeforeUpdate = btsRepository.findAll().size();

        // Update the bts
        Bts updatedBts = btsRepository.findById(bts.getId()).get();
        // Disconnect from session so that the updates on updatedBts are not directly saved in db
        em.detach(updatedBts);
        updatedBts
            .type(UPDATED_TYPE)
            .puissance(UPDATED_PUISSANCE)
            .etat(UPDATED_ETAT);

        restBtsMockMvc.perform(put("/api/bts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBts)))
            .andExpect(status().isOk());

        // Validate the Bts in the database
        List<Bts> btsList = btsRepository.findAll();
        assertThat(btsList).hasSize(databaseSizeBeforeUpdate);
        Bts testBts = btsList.get(btsList.size() - 1);
        assertThat(testBts.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testBts.getPuissance()).isEqualTo(UPDATED_PUISSANCE);
        assertThat(testBts.getEtat()).isEqualTo(UPDATED_ETAT);

        // Validate the Bts in Elasticsearch
        verify(mockBtsSearchRepository, times(1)).save(testBts);
    }

    @Test
    @Transactional
    public void updateNonExistingBts() throws Exception {
        int databaseSizeBeforeUpdate = btsRepository.findAll().size();

        // Create the Bts

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBtsMockMvc.perform(put("/api/bts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bts)))
            .andExpect(status().isBadRequest());

        // Validate the Bts in the database
        List<Bts> btsList = btsRepository.findAll();
        assertThat(btsList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Bts in Elasticsearch
        verify(mockBtsSearchRepository, times(0)).save(bts);
    }

    @Test
    @Transactional
    public void deleteBts() throws Exception {
        // Initialize the database
        btsRepository.saveAndFlush(bts);

        int databaseSizeBeforeDelete = btsRepository.findAll().size();

        // Delete the bts
        restBtsMockMvc.perform(delete("/api/bts/{id}", bts.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Bts> btsList = btsRepository.findAll();
        assertThat(btsList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Bts in Elasticsearch
        verify(mockBtsSearchRepository, times(1)).deleteById(bts.getId());
    }

    @Test
    @Transactional
    public void searchBts() throws Exception {
        // Initialize the database
        btsRepository.saveAndFlush(bts);
        when(mockBtsSearchRepository.search(queryStringQuery("id:" + bts.getId())))
            .thenReturn(Collections.singletonList(bts));
        // Search the bts
        restBtsMockMvc.perform(get("/api/_search/bts?query=id:" + bts.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bts.getId().intValue())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE)))
            .andExpect(jsonPath("$.[*].puissance").value(hasItem(DEFAULT_PUISSANCE)))
            .andExpect(jsonPath("$.[*].etat").value(hasItem(DEFAULT_ETAT)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Bts.class);
        Bts bts1 = new Bts();
        bts1.setId(1L);
        Bts bts2 = new Bts();
        bts2.setId(bts1.getId());
        assertThat(bts1).isEqualTo(bts2);
        bts2.setId(2L);
        assertThat(bts1).isNotEqualTo(bts2);
        bts1.setId(null);
        assertThat(bts1).isNotEqualTo(bts2);
    }
}
