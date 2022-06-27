package com.atos.operatappli.repository.search;

import com.atos.operatappli.domain.Taches;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Taches} entity.
 */
public interface TachesSearchRepository extends ElasticsearchRepository<Taches, Long> {
}
