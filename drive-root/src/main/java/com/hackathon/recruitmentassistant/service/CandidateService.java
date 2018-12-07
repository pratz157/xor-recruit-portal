package com.hackathon.recruitmentassistant.service;

import java.util.List;

import com.hackathon.recruitmentassistant.common.CommonCRUDService;
import com.hackathon.recruitmentassistant.model.Candidate;

public interface CandidateService extends CommonCRUDService<Candidate>{
	
	List<Candidate> getCandidateListForPanel(long pannelId);

}
 