package com.atos.operatappli.web.rest;

import com.atos.operatappli.OperatappliApp;
import com.atos.operatappli.domain.Qos;
import com.atos.operatappli.repository.QosRepository;
import com.atos.operatappli.repository.search.QosSearchRepository;
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
 * Integration tests for the {@Link QosResource} REST controller.
 */
@SpringBootTest(classes = OperatappliApp.class)
public class QosResourceIT {

    private static final String DEFAULT_TRAFFIC = "AAAAAAAAAA";
    private static final String UPDATED_TRAFFIC = "BBBBBBBBBB";

    private static final String DEFAULT_TEMPSDEREPONSE = "AAAAAAAAAA";
    private static final String UPDATED_TEMPSDEREPONSE = "BBBBBBBBBB";

    private static final String DEFAULT_SENSIBILITE = "AAAAAAAAAA";
    private static final String UPDATED_SENSIBILITE = "BBBBBBBBBB";

    private static final String DEFAULT_DEBIT = "AAAAAAAAAA";
    private static final String UPDATED_DEBIT = "BBBBBBBBBB";

    @Autowired
    private QosRepository qosRepository;

    /**
     * This repository is mocked in the com.atos.operatappli.repository.search test package.
     *
     * @see com.atos.operatappli.repository.search.QosSearchRepositoryMockConfiguration
     */
    @Autowired
    private QosSearchRepository mockQosSearchRepository;

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

    private MockMvc restQosMockMvc;

    private Qos qos;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final QosResource qosResource = new QosResource(qosRepository, mockQosSearchRepository);
        this.restQosMockMvc = MockMvcBuilders.standaloneSetup(qosResource)
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
    public static Qos createEntity(EntityManager em) {
        Qos qos = new Qos()
            .traffic(DEFAULT_TRAFFIC)
            .tempsdereponse(DEFAULT_TEMPSDEREPONSE)
            .sensibilite(DEFAULT_SENSIBILITE)
            .debit(DEFAULT_DEBIT);
        return qos;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Qos createUpdatedEntity(EntityManager em) {
        Qos qos = new Qos()
            .traffic(UPDATED_TRAFFIC)
            .tempsdereponse(UPDATED_TEMPSDEREPONSE)
            .sensibilite(UPDATED_SENSIBILITE)
            .debit(UPDATED_DEBIT);
        return qos;
    }

    @BeforeEach
    public void initTest() {
        qos = createEntity(em);
    }

    @Test
    @Transactional
    public void createQos() throws Exception {
        int databaseSizeBeforeCreate = qosRepository.findAll().size();

        // Create the Qos
        restQosMockMvc.perform(post("/api/qos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(qos)))
            .andExpect(status().isCreated());

        // Validate the Qos in the database
        List<Qos> qosList = qosRepository.findAll();
        assertThat(qosList).hasSize(databaseSizeBeforeCreate + 1);
        Qos testQos = qosList.get(qosList.size() - 1);
        assertThat(testQos.getTraffic()).isEqualTo(DEFAULT_TRAFFIC);
        assertThat(testQos.getTempsdereponse()).isEqualTo(DEFAULT_TEMPSDEREPONSE);
        assertThat(testQos.getSensibilite()).isEqualTo(DEFAULT_SENSIBILITE);
        assertThat(testQos.getDebit()).isEqualTo(DEFAULT_DEBIT);

        // Validate the Qos in Elasticsearch
        verify(mockQosSearchRepository, times(1)).save(testQos);
    }

    @Test
    @Transactional
    public void createQosWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = qosRepository.findAll().size();

        // Create the Qos with an existing ID
        qos.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restQosMockMvc.perform(post("/api/qos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(qos)))
            .andExpect(status().isBadRequest());

        // Validate the Qos in the database
        List<Qos> qosList = qosRepository.findAll();
        assertThat(qosList).hasSize(databaseSizeBeforeCreate);

        // Validate the Qos in Elasticsearch
        verify(mockQosSearchRepository, times(0)).save(qos);
    }


    @Test
    @Transactional
    public void getAllQos() throws Exception {
        // Initialize the database
        qosRepository.saveAndFlush(qos);

        // Get all the qosList
        restQosMockMvc.perform(get("/api/qos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(qos.getId().intValue())))
            .andExpect(jsonPath("$.[*].traffic").value(hasItem(DEFAULT_TRAFFIC.toString())))
            .andExpect(jsonPath("$.[*].tempsdereponse").value(hasItem(DEFAULT_TEMPSDEREPONSE.toString())))
            .andExpect(jsonPath("$.[*].sensibilite").value(hasItem(DEFAULT_SENSIBILITE.toString())))
            .andExpect(jsonPath("$.[*].debit").value(hasItem(DEFAULT_DEBIT.toString())));
    }
    
    @Test
    @Transactional
    public void getQos() throws Exception {
        // Initialize the database
        qosRepository.saveAndFlush(qos);

        // Get the qos
        restQosMockMvc.perform(get("/api/qos/{id}", qos.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(qos.getId().intValue()))
            .andExpect(jsonPath("$.traffic").value(DEFAULT_TRAFFIC.toString()))
            .andExpect(jsonPath("$.tempsdereponse").value(DEFAULT_TEMPSDEREPONSE.toString()))
            .andExpect(jsonPath("$.sensibilite").value(DEFAULT_SENSIBILITE.toString()))
            .andExpect(jsonPath("$.debit").value(DEFAULT_DEBIT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingQos() throws Exception {
        // Get the qos
        restQosMockMvc.perform(get("/api/qos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateQos() throws Exception {
        // Initialize the database
        qosRepository.saveAndFlush(qos);

        int databaseSizeBeforeUpdate = qosRepository.findAll().size();

        // Update the qos
        Qos updatedQos = qosRepository.findById(qos.getId()).get();
        // Disconnect from session so that the updates on updatedQos are not directly saved in db
        em.detach(updatedQos);
        updatedQos
            .traffic(UPDATED_TRAFFIC)
            .tempsdereponse(UPDATED_TEMPSDEREPONSE)
            .sensibilite(UPDATED_SENSIBILITE)
            .debit(UPDATED_DEBIT);

        restQosMockMvc.perform(put("/api/qos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedQos)))
            .andExpect(status().isOk());

        // Validate the Qos in the database
        List<Qos> qosList = qosRepository.findAll();
        assertThat(qosList).hasSize(databaseSizeBeforeUpdate);
        Qos testQos = qosList.get(qosList.size() - 1);
        assertThat(testQos.getTraffic()).isEqualTo(UPDATED_TRAFFIC);
        assertThat(testQos.getTempsdereponse()).isEqualTo(UPDATED_TEMPSDEREPONSE);
        assertThat(testQos.getSensibilite()).isEqualTo(UPDATED_SENSIBILITE);
        assertThat(testQos.getDebit()).isEqualTo(UPDATED_DEBIT);

        // Validate the Qos in Elasticsearch
        verify(mockQosSearchRepository, times(1)).save(testQos);
    }

    @Test
    @Transactional
    public void updateNonExistingQos() throws Exception {
        int databaseSizeBeforeUpdate = qosRepository.findAll().size();

        // Create the Qos

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restQosMockMvc.perform(put("/api/qos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(qos)))
            .andExpect(status().isBadRequest());

        // Validate the Qos in the database
        List<Qos> qosList = qosRepository.findAll();
        assertThat(qosList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Qos in Elasticsearch
        verify(mockQosSearchRepository, times(0)).save(qos);
    }

    @Test
    @Transactional
    public void deleteQos() throws Exception {
        // Initialize the database
        qosRepository.saveAndFlush(qos);

        int databaseSizeBeforeDelete = qosRepository.findAll().size();

        // Delete the qos
        restQosMockMvc.perform(delete("/api/qos/{id}", qos.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Qos> qosList = qosRepository.findAll();
        assertThat(qosList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Qos in Elasticsearch
        verify(mockQosSearchRepository, times(1)).deleteById(qos.getId());
    }

    @Test
    @Transactional
    public void searchQos() throws Exception {
        // Initialize the database
        qosRepository.saveAndFlush(qos);
        when(mockQosSearchRepository.search(queryStringQuery("id:" + qos.getId())))
            .thenReturn(Collections.singletonList(qos));
        // Search the qos
        restQosMockMvc.perform(get("/api/_search/qos?query=id:" + qos.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(qos.getId().intValue())))
            .andExpect(jsonPath("$.[*].traffic").value(hasItem(DEFAULT_TRAFFIC)))
            .andExpect(jsonPath("$.[*].tempsdereponse").value(hasItem(DEFAULT_TEMPSDEREPONSE)))
            .andExpect(jsonPath("$.[*].sensibilite").value(hasItem(DEFAULT_SENSIBILITE)))
            .andExpect(jsonPath("$.[*].debit").value(hasItem(DEFAULT_DEBIT)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Qos.class);
        Qos qos1 = new Qos();
        qos1.setId(1L);
        Qos qos2 = new Qos();
        qos2.setId(qos1.getId());
        assertThat(qos1).isEqualTo(qos2);
        qos2.setId(2L);
        assertThat(qos1).isNotEqualTo(qos2);
        qos1.setId(null);
        assertThat(qos1).isNotEqualTo(qos2);
    }
}
