package com.atos.operatappli.web.rest;

import com.atos.operatappli.domain.Zones;
import com.atos.operatappli.repository.ZonesRepository;
import com.atos.operatappli.repository.search.ZonesSearchRepository;
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
 * REST controller for managing {@link com.atos.operatappli.domain.Zones}.
 */
@RestController
@RequestMapping("/api")
public class ZonesResource {

    private final Logger log = LoggerFactory.getLogger(ZonesResource.class);

    private static final String ENTITY_NAME = "zones";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ZonesRepository zonesRepository;

    private final ZonesSearchRepository zonesSearchRepository;

    public ZonesResource(ZonesRepository zonesRepository, ZonesSearchRepository zonesSearchRepository) {
        this.zonesRepository = zonesRepository;
        this.zonesSearchRepository = zonesSearchRepository;
    }

    /**
     * {@code POST  /zones} : Create a new zones.
     *
     * @param zones the zones to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new zones, or with status {@code 400 (Bad Request)} if the zones has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/zones")
    public ResponseEntity<Zones> createZones(@RequestBody Zones zones) throws URISyntaxException {
        log.debug("REST request to save Zones : {}", zones);
        if (zones.getId() != null) {
            throw new BadRequestAlertException("A new zones cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Zones result = zonesRepository.save(zones);
        zonesSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/zones/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /zones} : Updates an existing zones.
     *
     * @param zones the zones to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated zones,
     * or with status {@code 400 (Bad Request)} if the zones is not valid,
     * or with status {@code 500 (Internal Server Error)} if the zones couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/zones")
    public ResponseEntity<Zones> updateZones(@RequestBody Zones zones) throws URISyntaxException {
        log.debug("REST request to update Zones : {}", zones);
        if (zones.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Zones result = zonesRepository.save(zones);
        zonesSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, zones.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /zones} : get all the zones.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of zones in body.
     */
    @GetMapping("/zones")
    public List<Zones> getAllZones() {
        log.debug("REST request to get all Zones");
        return zonesRepository.findAll();
    }

    /**
     * {@code GET  /zones/:id} : get the "id" zones.
     *
     * @param id the id of the zones to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the zones, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/zones/{id}")
    public ResponseEntity<Zones> getZones(@PathVariable Long id) {
        log.debug("REST request to get Zones : {}", id);
        Optional<Zones> zones = zonesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(zones);
    }

    /**
     * {@code DELETE  /zones/:id} : delete the "id" zones.
     *
     * @param id the id of the zones to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/zones/{id}")
    public ResponseEntity<Void> deleteZones(@PathVariable Long id) {
        log.debug("REST request to delete Zones : {}", id);
        zonesRepository.deleteById(id);
        zonesSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/zones?query=:query} : search for the zones corresponding
     * to the query.
     *
     * @param query the query of the zones search.
     * @return the result of the search.
     */
    @GetMapping("/_search/zones")
    public List<Zones> searchZones(@RequestParam String query) {
        log.debug("REST request to search Zones for query {}", query);
        return StreamSupport
            .stream(zonesSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
