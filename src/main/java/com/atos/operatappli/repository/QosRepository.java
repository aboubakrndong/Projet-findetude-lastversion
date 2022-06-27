package com.atos.operatappli.repository;

import com.atos.operatappli.domain.Qos;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Qos entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QosRepository extends JpaRepository<Qos, Long> {

}
