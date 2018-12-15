package com.hackathon.recruitmentassistant.dto;

public class AssignCandidateDTO {
	
	private long candidateId;
	private long adminId;
	private long driveId;
	
	public long getDriveId() {
		return driveId;
	}
	public void setDriveId(long driveId) {
		this.driveId = driveId;
	}
	public long getCandidateId() {
		return candidateId;
	}
	public void setCandidateId(long candidateId) {
		this.candidateId = candidateId;
	}
	public long getAdminId() {
		return adminId;
	}
	public void setAdminId(long adminId) {
		this.adminId = adminId;
	}

}
