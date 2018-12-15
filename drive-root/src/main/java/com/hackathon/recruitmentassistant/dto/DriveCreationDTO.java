package com.hackathon.recruitmentassistant.dto;

import java.util.Date;
import java.util.List;

public class DriveCreationDTO {
	
	private Date scheduledAt;
	private long skill_id;
	private List<CandidateDTO> candidates;
	private long admin_id;
	public Date getScheduledAt() {
		return scheduledAt;
	}
	public void setScheduledAt(Date scheduledAt) {
		this.scheduledAt = scheduledAt;
	}
	public long getSkill_id() {
		return skill_id;
	}
	public void setSkill_id(long skill_id) {
		this.skill_id = skill_id;
	}
	public List<CandidateDTO> getCandidates() {
		return candidates;
	}
	public void setCandidates(List<CandidateDTO> candidates) {
		this.candidates = candidates;
	}
	public long getAdmin_id() {
		return admin_id;
	}
	public void setAdmin_id(long admin_id) {
		this.admin_id = admin_id;
	}
	
}
