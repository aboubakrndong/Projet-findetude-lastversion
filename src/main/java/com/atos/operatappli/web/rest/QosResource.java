package com.atos.operatappli.web.rest;

import com.atos.operatappli.domain.Qos;
import com.atos.operatappli.repository.QosRepository;
import com.atos.operatappli.repository.search.QosSearchRepository;
import com.atos.operatappli.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link com.atos.operatappli.domain.Qos}.
 */
@RestController
@RequestMapping("/api")
public class QosResource {

    private final Logger log = LoggerFactory.getLogger(QosResource.class);

    private static final String ENTITY_NAME = "qos";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final QosRepository qosRepository;

    private final QosSearchRepository qosSearchRepository;

    public QosResource(QosRepository qosRepository, QosSearchRepository qosSearchRepository) {
        this.qosRepository = qosRepository;
        this.qosSearchRepository = qosSearchRepository;
    }

    /**
     * {@code POST  /qos} : Create a new qos.
     *
     * @param qos the qos to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new qos, or with status {@code 400 (Bad Request)} if the qos has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/qos")
    public ResponseEntity<Qos> createQos(@RequestBody Qos qos) throws URISyntaxException {
        log.debug("REST request to save Qos : {}", qos);
        if (qos.getId() != null) {
            throw new BadRequestAlertException("A new qos cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Qos result = qosRepository.save(qos);
        qosSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/qos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /qos} : Updates an existing qos.
     *
     * @param qos the qos to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated qos,
     * or with status {@code 400 (Bad Request)} if the qos is not valid,
     * or with status {@code 500 (Internal Server Error)} if the qos couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/qos")
    public ResponseEntity<Qos> updateQos(@RequestBody Qos qos) throws URISyntaxException {
        log.debug("REST request to update Qos : {}", qos);
        if (qos.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Qos result = qosRepository.save(qos);
        qosSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, qos.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /qos} : get all the qos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of qos in body.
     */
    @GetMapping("/qos")
    public List<Qos> getAllQos() {
        log.debug("REST request to get all Qos");
        return qosRepository.findAll();
    }

    /**
     * {@code GET  /qos/:id} : get the "id" qos.
     *
     * @param id the id of the qos to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the qos, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/qos/{id}")
    public ResponseEntity<Qos> getQos(@PathVariable Long id) {
        log.debug("REST request to get Qos : {}", id);
        Optional<Qos> qos = qosRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(qos);
    }

    /**
     * {@code DELETE  /qos/:id} : delete the "id" qos.
     *
     * @param id the id of the qos to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/qos/{id}")
    public ResponseEntity<Void> deleteQos(@PathVariable Long id) {
        log.debug("REST request to delete Qos : {}", id);
        qosRepository.deleteById(id);
        qosSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/qos?query=:query} : search for the qos corresponding
     * to the query.
     *
     * @param query the query of the qos search.
     * @return the result of the search.
     */
    @GetMapping("/_search/qos")
    public List<Qos> searchQos(@RequestParam String query) {
        log.debug("REST request to search Qos for query {}", query);
        return StreamSupport
            .stream(qosSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
