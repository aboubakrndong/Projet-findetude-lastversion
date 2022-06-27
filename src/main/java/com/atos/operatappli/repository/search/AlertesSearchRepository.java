package com.atos.operatappli.repository.search;

import com.atos.operatappli.domain.Alertes;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Alertes} entity.
 */
public interface AlertesSearchRepository extends ElasticsearchRepository<Alertes, Long> {
}
