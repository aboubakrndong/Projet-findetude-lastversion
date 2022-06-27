package com.atos.operatappli.web.rest;

import com.atos.operatappli.domain.Kpi;
import com.atos.operatappli.repository.KpiRepository;
import com.atos.operatappli.repository.search.KpiSearchRepository;
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
 * REST controller for managing {@link com.atos.operatappli.domain.Kpi}.
 */
@RestController
@RequestMapping("/api")
public class KpiResource {

    private final Logger log = LoggerFactory.getLogger(KpiResource.class);

    private static final String ENTITY_NAME = "kpi";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final KpiRepository kpiRepository;

    private final KpiSearchRepository kpiSearchRepository;

    public KpiResource(KpiRepository kpiRepository, KpiSearchRepository kpiSearchRepository) {
        this.kpiRepository = kpiRepository;
        this.kpiSearchRepository = kpiSearchRepository;
    }

    /**
     * {@code POST  /kpis} : Create a new kpi.
     *
     * @param kpi the kpi to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new kpi, or with status {@code 400 (Bad Request)} if the kpi has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/kpis")
    public ResponseEntity<Kpi> createKpi(@RequestBody Kpi kpi) throws URISyntaxException {
        log.debug("REST request to save Kpi : {}", kpi);
        if (kpi.getId() != null) {
            throw new BadRequestAlertException("A new kpi cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Kpi result = kpiRepository.save(kpi);
        kpiSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/kpis/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /kpis} : Updates an existing kpi.
     *
     * @param kpi the kpi to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated kpi,
     * or with status {@code 400 (Bad Request)} if the kpi is not valid,
     * or with status {@code 500 (Internal Server Error)} if the kpi couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/kpis")
    public ResponseEntity<Kpi> updateKpi(@RequestBody Kpi kpi) throws URISyntaxException {
        log.debug("REST request to update Kpi : {}", kpi);
        if (kpi.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Kpi result = kpiRepository.save(kpi);
        kpiSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, kpi.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /kpis} : get all the kpis.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of kpis in body.
     */
    @GetMapping("/kpis")
    public List<Kpi> getAllKpis() {
        log.debug("REST request to get all Kpis");
        return kpiRepository.findAll();
    }

    /**
     * {@code GET  /kpis/:id} : get the "id" kpi.
     *
     * @param id the id of the kpi to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the kpi, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/kpis/{id}")
    public ResponseEntity<Kpi> getKpi(@PathVariable Long id) {
        log.debug("REST request to get Kpi : {}", id);
        Optional<Kpi> kpi = kpiRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(kpi);
    }

    /**
     * {@code DELETE  /kpis/:id} : delete the "id" kpi.
     *
     * @param id the id of the kpi to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/kpis/{id}")
    public ResponseEntity<Void> deleteKpi(@PathVariable Long id) {
        log.debug("REST request to delete Kpi : {}", id);
        kpiRepository.deleteById(id);
        kpiSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/kpis?query=:query} : search for the kpi corresponding
     * to the query.
     *
     * @param query the query of the kpi search.
     * @return the result of the search.
     */
    @GetMapping("/_search/kpis")
    public List<Kpi> searchKpis(@RequestParam String query) {
        log.debug("REST request to search Kpis for query {}", query);
        return StreamSupport
            .stream(kpiSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
