# Build stage
FROM eclipse-temurin:21-jdk AS build
WORKDIR /app
COPY . .
# Generate the jar file inside the container
RUN ./mvnw package -DskipTests

# Run stage
FROM eclipse-temurin:21-jre
WORKDIR /app
# The path is absolute, within docker container
COPY --from=build /app/target/bookmarked-api-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]

# FROM eclipse-temurin:21-jre
# WORKDIR /app
# # Old approach required building on the host and then copying the jar file into the container
# COPY target/bookmarked-api-0.0.1-SNAPSHOT.jar app.jar
# ENTRYPOINT ["java", "-jar", "app.jar"]