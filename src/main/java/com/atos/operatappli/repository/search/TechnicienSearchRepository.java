package com.atos.operatappli.repository.search;

import com.atos.operatappli.domain.Technicien;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Technicien} entity.
 */
public interface TechnicienSearchRepository extends ElasticsearchRepository<Technicien, Long> {
}
