package com.atos.operatappli.web.rest;

import com.atos.operatappli.domain.Technicien;
import com.atos.operatappli.repository.TechnicienRepository;
import com.atos.operatappli.repository.search.TechnicienSearchRepository;
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
 * REST controller for managing {@link com.atos.operatappli.domain.Technicien}.
 */
@RestController
@RequestMapping("/api")
public class TechnicienResource {

    private final Logger log = LoggerFactory.getLogger(TechnicienResource.class);

    private static final String ENTITY_NAME = "technicien";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TechnicienRepository technicienRepository;

    private final TechnicienSearchRepository technicienSearchRepository;

    public TechnicienResource(TechnicienRepository technicienRepository, TechnicienSearchRepository technicienSearchRepository) {
        this.technicienRepository = technicienRepository;
        this.technicienSearchRepository = technicienSearchRepository;
    }

    /**
     * {@code POST  /techniciens} : Create a new technicien.
     *
     * @param technicien the technicien to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new technicien, or with status {@code 400 (Bad Request)} if the technicien has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/techniciens")
    public ResponseEntity<Technicien> createTechnicien(@RequestBody Technicien technicien) throws URISyntaxException {
        log.debug("REST request to save Technicien : {}", technicien);
        if (technicien.getId() != null) {
            throw new BadRequestAlertException("A new technicien cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Technicien result = technicienRepository.save(technicien);
        technicienSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/techniciens/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /techniciens} : Updates an existing technicien.
     *
     * @param technicien the technicien to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated technicien,
     * or with status {@code 400 (Bad Request)} if the technicien is not valid,
     * or with status {@code 500 (Internal Server Error)} if the technicien couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/techniciens")
    public ResponseEntity<Technicien> updateTechnicien(@RequestBody Technicien technicien) throws URISyntaxException {
        log.debug("REST request to update Technicien : {}", technicien);
        if (technicien.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Technicien result = technicienRepository.save(technicien);
        technicienSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, technicien.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /techniciens} : get all the techniciens.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of techniciens in body.
     */
    @GetMapping("/techniciens")
    public List<Technicien> getAllTechniciens() {
        log.debug("REST request to get all Techniciens");
        return technicienRepository.findAll();
    }

    /**
     * {@code GET  /techniciens/:id} : get the "id" technicien.
     *
     * @param id the id of the technicien to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the technicien, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/techniciens/{id}")
    public ResponseEntity<Technicien> getTechnicien(@PathVariable Long id) {
        log.debug("REST request to get Technicien : {}", id);
        Optional<Technicien> technicien = technicienRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(technicien);
    }

    /**
     * {@code DELETE  /techniciens/:id} : delete the "id" technicien.
     *
     * @param id the id of the technicien to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/techniciens/{id}")
    public ResponseEntity<Void> deleteTechnicien(@PathVariable Long id) {
        log.debug("REST request to delete Technicien : {}", id);
        technicienRepository.deleteById(id);
        technicienSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/techniciens?query=:query} : search for the technicien corresponding
     * to the query.
     *
     * @param query the query of the technicien search.
     * @return the result of the search.
     */
    @GetMapping("/_search/techniciens")
    public List<Technicien> searchTechniciens(@RequestParam String query) {
        log.debug("REST request to search Techniciens for query {}", query);
        return StreamSupport
            .stream(technicienSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
