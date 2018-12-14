package com.hackathon.recruitmentassistant.dto;

/**
 * @author Pritesh Baviskar
 * Date: 12/14/2018
 */
public class AdminParams {

    private long id;
    private String password;
    private String role;
    private String emailId;
    private long skillID;
    private long driveID;


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public long getSkillID() {
        return skillID;
    }

    public void setSkillID(long skillID) {
        this.skillID = skillID;
    }

    public long getDriveID() {
        return driveID;
    }

    public void setDriveID(long driveID) {
        this.driveID = driveID;
    }

    @Override
    public String toString() {
        return "AdminParams{" +
                "id=" + id +
                ", password='" + password + '\'' +
                ", role='" + role + '\'' +
                ", emailId='" + emailId + '\'' +
                ", skillID=" + skillID +
                ", driveID=" + driveID +
                '}';
    }
}

