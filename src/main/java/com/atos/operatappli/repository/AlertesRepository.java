package com.atos.operatappli.repository;

import com.atos.operatappli.domain.Alertes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Alertes entity.
 */
@Repository
public interface AlertesRepository extends JpaRepository<Alertes, Long> {

    @Query(value = "select distinct alertes from Alertes alertes left join fetch alertes.techniciens",
        countQuery = "select count(distinct alertes) from Alertes alertes")
    Page<Alertes> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct alertes from Alertes alertes left join fetch alertes.techniciens")
    List<Alertes> findAllWithEagerRelationships();

    @Query("select alertes from Alertes alertes left join fetch alertes.techniciens where alertes.id =:id")
    Optional<Alertes> findOneWithEagerRelationships(@Param("id") Long id);

}
