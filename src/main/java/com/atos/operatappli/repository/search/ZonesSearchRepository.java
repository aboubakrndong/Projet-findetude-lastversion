package com.atos.operatappli.repository.search;

import com.atos.operatappli.domain.Zones;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Zones} entity.
 */
public interface ZonesSearchRepository extends ElasticsearchRepository<Zones, Long> {
}
