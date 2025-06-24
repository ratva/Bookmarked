package com.bookmarked.bookmarked_api;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.neo4j.driver.Driver;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest 
@ActiveProfiles("test")
class BookmarkedApiApplicationTests {

    /**
     * This nested static class provides test-specific bean definitions.
     * It will be used to override production beans for the test context.
     */
    @TestConfiguration
    static class TestConfig {

        /**
         * Creates a mock of the Neo4j Driver bean.
         * @return A mock Driver object.
         */
        @Bean
        @Primary
        public Driver neo4jDriver() {
            // We use Mockito to create a "fake" Driver instance that does nothing.
            // The @Primary annotation tells Spring: "If you need a Driver bean for this test,
            // use this mock one instead of trying to create a real one."
            return Mockito.mock(Driver.class);
        }
    }

    @Test
    void contextLoads() {
        // This test will now run with a dedicated test profile, using an
        // in-memory H2 database for PostgreSQL and a mock for Neo4j.
    }

}