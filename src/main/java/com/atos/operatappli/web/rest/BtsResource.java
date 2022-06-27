package com.atos.operatappli.web.rest;

import com.atos.operatappli.domain.Bts;
import com.atos.operatappli.repository.BtsRepository;
import com.atos.operatappli.repository.search.BtsSearchRepository;
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
 * REST controller for managing {@link com.atos.operatappli.domain.Bts}.
 */
@RestController
@RequestMapping("/api")
public class BtsResource {

    private final Logger log = LoggerFactory.getLogger(BtsResource.class);

    private static final String ENTITY_NAME = "bts";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BtsRepository btsRepository;

    private final BtsSearchRepository btsSearchRepository;

    public BtsResource(BtsRepository btsRepository, BtsSearchRepository btsSearchRepository) {
        this.btsRepository = btsRepository;
        this.btsSearchRepository = btsSearchRepository;
    }

    /**
     * {@code POST  /bts} : Create a new bts.
     *
     * @param bts the bts to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new bts, or with status {@code 400 (Bad Request)} if the bts has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/bts")
    public ResponseEntity<Bts> createBts(@RequestBody Bts bts) throws URISyntaxException {
        log.debug("REST request to save Bts : {}", bts);
        if (bts.getId() != null) {
            throw new BadRequestAlertException("A new bts cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Bts result = btsRepository.save(bts);
        btsSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/bts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /bts} : Updates an existing bts.
     *
     * @param bts the bts to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated bts,
     * or with status {@code 400 (Bad Request)} if the bts is not valid,
     * or with status {@code 500 (Internal Server Error)} if the bts couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/bts")
    public ResponseEntity<Bts> updateBts(@RequestBody Bts bts) throws URISyntaxException {
        log.debug("REST request to update Bts : {}", bts);
        if (bts.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Bts result = btsRepository.save(bts);
        btsSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, bts.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /bts} : get all the bts.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of bts in body.
     */
    @GetMapping("/bts")
    public List<Bts> getAllBts() {
        log.debug("REST request to get all Bts");
        return btsRepository.findAll();
    }

    /**
     * {@code GET  /bts/:id} : get the "id" bts.
     *
     * @param id the id of the bts to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the bts, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/bts/{id}")
    public ResponseEntity<Bts> getBts(@PathVariable Long id) {
        log.debug("REST request to get Bts : {}", id);
        Optional<Bts> bts = btsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(bts);
    }

    /**
     * {@code DELETE  /bts/:id} : delete the "id" bts.
     *
     * @param id the id of the bts to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/bts/{id}")
    public ResponseEntity<Void> deleteBts(@PathVariable Long id) {
        log.debug("REST request to delete Bts : {}", id);
        btsRepository.deleteById(id);
        btsSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/bts?query=:query} : search for the bts corresponding
     * to the query.
     *
     * @param query the query of the bts search.
     * @return the result of the search.
     */
    @GetMapping("/_search/bts")
    public List<Bts> searchBts(@RequestParam String query) {
        log.debug("REST request to search Bts for query {}", query);
        return StreamSupport
            .stream(btsSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
