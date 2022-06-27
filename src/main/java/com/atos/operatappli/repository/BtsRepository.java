package com.atos.operatappli.repository;

import com.atos.operatappli.domain.Bts;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Bts entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BtsRepository extends JpaRepository<Bts, Long> {

}
