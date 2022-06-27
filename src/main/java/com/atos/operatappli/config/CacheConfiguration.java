package com.atos.operatappli.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import org.hibernate.cache.jcache.ConfigSettings;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.cloud.client.serviceregistry.Registration;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, com.atos.operatappli.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, com.atos.operatappli.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, com.atos.operatappli.domain.User.class.getName());
            createCache(cm, com.atos.operatappli.domain.Authority.class.getName());
            createCache(cm, com.atos.operatappli.domain.User.class.getName() + ".authorities");
            createCache(cm, com.atos.operatappli.domain.Qos.class.getName());
            createCache(cm, com.atos.operatappli.domain.Zones.class.getName());
            createCache(cm, com.atos.operatappli.domain.Zones.class.getName() + ".qos");
            createCache(cm, com.atos.operatappli.domain.Zones.class.getName() + ".kpis");
            createCache(cm, com.atos.operatappli.domain.Zones.class.getName() + ".bts");
            createCache(cm, com.atos.operatappli.domain.Kpi.class.getName());
            createCache(cm, com.atos.operatappli.domain.Alertes.class.getName());
            createCache(cm, com.atos.operatappli.domain.Alertes.class.getName() + ".techniciens");
            createCache(cm, com.atos.operatappli.domain.Bts.class.getName());
            createCache(cm, com.atos.operatappli.domain.Bts.class.getName() + ".alertes");
            createCache(cm, com.atos.operatappli.domain.Taches.class.getName());
            createCache(cm, com.atos.operatappli.domain.Taches.class.getName() + ".techniciens");
            createCache(cm, com.atos.operatappli.domain.Technicien.class.getName());
            createCache(cm, com.atos.operatappli.domain.Technicien.class.getName() + ".alertes");
            createCache(cm, com.atos.operatappli.domain.Technicien.class.getName() + ".taches");
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache != null) {
            cm.destroyCache(cacheName);
        }
        cm.createCache(cacheName, jcacheConfiguration);
    }
}
