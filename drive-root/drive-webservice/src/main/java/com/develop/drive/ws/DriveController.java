package com.develop.drive.ws;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Pritesh Baviskar
 * Date: 11/28/2018
 */
@RestController
public class DriveController {

    @RequestMapping("/")
    public String home() {
        return "Spring boot success!";
    }
}
