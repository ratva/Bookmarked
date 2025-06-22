package com.bookmarked.bookmarked_api;

import org.junit.jupiter.api.Test;
import org.neo4j.driver.Driver;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest 
@ActiveProfiles("test")
class BookmarkedApiApplicationTests {

	// This mock prevents the test from trying to connect to a real Neo4j database.
    @MockBean
    private Driver neo4jDriver;

    @Test
    void contextLoads() {
        // This test will now run with a dedicated test profile, using an
        // in-memory H2 database for PostgreSQL and a mock for Neo4j.
    }

}
