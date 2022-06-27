package com.atos.operatappli.web.rest;

import com.atos.operatappli.domain.Alertes;
import com.atos.operatappli.repository.AlertesRepository;
import com.atos.operatappli.repository.search.AlertesSearchRepository;
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
 * REST controller for managing {@link com.atos.operatappli.domain.Alertes}.
 */
@RestController
@RequestMapping("/api")
public class AlertesResource {

    private final Logger log = LoggerFactory.getLogger(AlertesResource.class);

    private static final String ENTITY_NAME = "alertes";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AlertesRepository alertesRepository;

    private final AlertesSearchRepository alertesSearchRepository;

    public AlertesResource(AlertesRepository alertesRepository, AlertesSearchRepository alertesSearchRepository) {
        this.alertesRepository = alertesRepository;
        this.alertesSearchRepository = alertesSearchRepository;
    }

    /**
     * {@code POST  /alertes} : Create a new alertes.
     *
     * @param alertes the alertes to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new alertes, or with status {@code 400 (Bad Request)} if the alertes has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/alertes")
    public ResponseEntity<Alertes> createAlertes(@RequestBody Alertes alertes) throws URISyntaxException {
        log.debug("REST request to save Alertes : {}", alertes);
        if (alertes.getId() != null) {
            throw new BadRequestAlertException("A new alertes cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Alertes result = alertesRepository.save(alertes);
        alertesSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/alertes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /alertes} : Updates an existing alertes.
     *
     * @param alertes the alertes to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated alertes,
     * or with status {@code 400 (Bad Request)} if the alertes is not valid,
     * or with status {@code 500 (Internal Server Error)} if the alertes couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/alertes")
    public ResponseEntity<Alertes> updateAlertes(@RequestBody Alertes alertes) throws URISyntaxException {
        log.debug("REST request to update Alertes : {}", alertes);
        if (alertes.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Alertes result = alertesRepository.save(alertes);
        alertesSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, alertes.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /alertes} : get all the alertes.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of alertes in body.
     */
    @GetMapping("/alertes")
    public List<Alertes> getAllAlertes(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Alertes");
        return alertesRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /alertes/:id} : get the "id" alertes.
     *
     * @param id the id of the alertes to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the alertes, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/alertes/{id}")
    public ResponseEntity<Alertes> getAlertes(@PathVariable Long id) {
        log.debug("REST request to get Alertes : {}", id);
        Optional<Alertes> alertes = alertesRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(alertes);
    }

    /**
     * {@code DELETE  /alertes/:id} : delete the "id" alertes.
     *
     * @param id the id of the alertes to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/alertes/{id}")
    public ResponseEntity<Void> deleteAlertes(@PathVariable Long id) {
        log.debug("REST request to delete Alertes : {}", id);
        alertesRepository.deleteById(id);
        alertesSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/alertes?query=:query} : search for the alertes corresponding
     * to the query.
     *
     * @param query the query of the alertes search.
     * @return the result of the search.
     */
    @GetMapping("/_search/alertes")
    public List<Alertes> searchAlertes(@RequestParam String query) {
        log.debug("REST request to search Alertes for query {}", query);
        return StreamSupport
            .stream(alertesSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
