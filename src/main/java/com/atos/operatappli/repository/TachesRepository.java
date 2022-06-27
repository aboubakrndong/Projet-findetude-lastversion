package com.atos.operatappli.repository;

import com.atos.operatappli.domain.Taches;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Taches entity.
 */
@Repository
public interface TachesRepository extends JpaRepository<Taches, Long> {

    @Query(value = "select distinct taches from Taches taches left join fetch taches.techniciens",
        countQuery = "select count(distinct taches) from Taches taches")
    Page<Taches> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct taches from Taches taches left join fetch taches.techniciens")
    List<Taches> findAllWithEagerRelationships();

    @Query("select taches from Taches taches left join fetch taches.techniciens where taches.id =:id")
    Optional<Taches> findOneWithEagerRelationships(@Param("id") Long id);

}
