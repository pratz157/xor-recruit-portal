package com.hackathon.recruitmentassistant.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hackathon.recruitmentassistant.model.Skill;

@Repository
public interface SkillDao extends JpaRepository<Skill,Long>{

}
