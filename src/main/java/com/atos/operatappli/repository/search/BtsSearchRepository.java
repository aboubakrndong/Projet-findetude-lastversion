package com.atos.operatappli.repository.search;

import com.atos.operatappli.domain.Bts;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Bts} entity.
 */
public interface BtsSearchRepository extends ElasticsearchRepository<Bts, Long> {
}
