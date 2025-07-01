package com.bookmarked.bookmarked_api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.neo4j.driver.Driver;
import org.neo4j.driver.Session;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthCheckController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private Driver neo4jDriver;

    @GetMapping("/health/postgres")
    public String checkPostgres() {
        try {
            jdbcTemplate.queryForObject("SELECT 1", Integer.class);
            return "PostgreSQL is UP";
        } catch (Exception e) {
            return "PostgreSQL is DOWN: " + e.getMessage();
        }
    }

    @GetMapping("/health/neo4j")
    public String checkNeo4j() {
        try (Session session = neo4jDriver.session()) {
            session.run("RETURN 1");
            return "Neo4j is UP";
        } catch (Exception e) {
            return "Neo4j is DOWN: " + e.getMessage();
        }
    }
}
