package com.atos.operatappli.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link ZonesSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class ZonesSearchRepositoryMockConfiguration {

    @MockBean
    private ZonesSearchRepository mockZonesSearchRepository;

}
