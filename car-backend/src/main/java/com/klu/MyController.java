package com.klu;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/back2")
public class MyController {

    @GetMapping
    public String test() {
        return "Hello from /back2!";
    }
}

