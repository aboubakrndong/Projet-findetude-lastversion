package com.atos.operatappli.web.rest;

import com.atos.operatappli.domain.Taches;
import com.atos.operatappli.repository.TachesRepository;
import com.atos.operatappli.repository.search.TachesSearchRepository;
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
 * REST controller for managing {@link com.atos.operatappli.domain.Taches}.
 */
@RestController
@RequestMapping("/api")
public class TachesResource {

    private final Logger log = LoggerFactory.getLogger(TachesResource.class);

    private static final String ENTITY_NAME = "taches";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TachesRepository tachesRepository;

    private final TachesSearchRepository tachesSearchRepository;

    public TachesResource(TachesRepository tachesRepository, TachesSearchRepository tachesSearchRepository) {
        this.tachesRepository = tachesRepository;
        this.tachesSearchRepository = tachesSearchRepository;
    }

    /**
     * {@code POST  /taches} : Create a new taches.
     *
     * @param taches the taches to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new taches, or with status {@code 400 (Bad Request)} if the taches has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/taches")
    public ResponseEntity<Taches> createTaches(@RequestBody Taches taches) throws URISyntaxException {
        log.debug("REST request to save Taches : {}", taches);
        if (taches.getId() != null) {
            throw new BadRequestAlertException("A new taches cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Taches result = tachesRepository.save(taches);
        tachesSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/taches/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /taches} : Updates an existing taches.
     *
     * @param taches the taches to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated taches,
     * or with status {@code 400 (Bad Request)} if the taches is not valid,
     * or with status {@code 500 (Internal Server Error)} if the taches couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/taches")
    public ResponseEntity<Taches> updateTaches(@RequestBody Taches taches) throws URISyntaxException {
        log.debug("REST request to update Taches : {}", taches);
        if (taches.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Taches result = tachesRepository.save(taches);
        tachesSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, taches.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /taches} : get all the taches.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of taches in body.
     */
    @GetMapping("/taches")
    public List<Taches> getAllTaches(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Taches");
        return tachesRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /taches/:id} : get the "id" taches.
     *
     * @param id the id of the taches to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the taches, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/taches/{id}")
    public ResponseEntity<Taches> getTaches(@PathVariable Long id) {
        log.debug("REST request to get Taches : {}", id);
        Optional<Taches> taches = tachesRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(taches);
    }

    /**
     * {@code DELETE  /taches/:id} : delete the "id" taches.
     *
     * @param id the id of the taches to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/taches/{id}")
    public ResponseEntity<Void> deleteTaches(@PathVariable Long id) {
        log.debug("REST request to delete Taches : {}", id);
        tachesRepository.deleteById(id);
        tachesSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/taches?query=:query} : search for the taches corresponding
     * to the query.
     *
     * @param query the query of the taches search.
     * @return the result of the search.
     */
    @GetMapping("/_search/taches")
    public List<Taches> searchTaches(@RequestParam String query) {
        log.debug("REST request to search Taches for query {}", query);
        return StreamSupport
            .stream(tachesSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
