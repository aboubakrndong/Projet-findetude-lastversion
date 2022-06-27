package com.atos.operatappli.repository.search;

import com.atos.operatappli.domain.Qos;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Qos} entity.
 */
public interface QosSearchRepository extends ElasticsearchRepository<Qos, Long> {
}
