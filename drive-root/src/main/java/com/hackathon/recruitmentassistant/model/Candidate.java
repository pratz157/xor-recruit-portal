package com.hackathon.recruitmentassistant.model;

import java.util.Date;
import java.util.Optional;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name="candidate")
@EntityListeners(AuditingEntityListener.class)
public class Candidate {
	
	private long id;
	private String name;
	private String emailId;
	private Date createdAt;
	private Date updatedAt;
	private Drive drive;
	private String status;
	private Admin admin;
	
	
	
	@ManyToOne
	@JoinColumn(name="drive_id",nullable=false)
	@JsonBackReference
	public Drive getDrive() {
		return drive;
	}
	public void setDrive(Drive drive) {
		this.drive = drive;
	}
	
	@Column(name = "created_at", nullable = true)
    @CreatedDate
	public Date getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}
	
	@Column(name = "updated_at", nullable = true)
    @CreatedDate
	public Date getUpdatedAt() {
		return updatedAt;
	}
	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}
	
	
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "candidate_id")
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	
	@Column(name="name", nullable= false)
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	@Column(name="email_id", nullable= false)
	public String getEmailId() {
		return emailId;
	}
	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}
	
	@Column(name="status", nullable= true, columnDefinition="varchar(255) default 'In Progress'")
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	@OneToOne
	@JoinColumn(name="admin_id",nullable=true)
	//@JsonBackReference
	public Admin getAdmin() {
		return admin;
	}
	public void setAdmin(Admin admin) {
		this.admin = admin;
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((emailId == null) ? 0 : emailId.hashCode());
		result = prime * result + (int) (id ^ (id >>> 32));
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Candidate other = (Candidate) obj;
		if (emailId == null) {
			if (other.emailId != null)
				return false;
		} else if (!emailId.equals(other.emailId))
			return false;
		if (id != other.id)
			return false;
		return true;
	}

}
