FROM maven:3.6.1-jdk-8-alpine as backend-build
WORKDIR /fullstack/backend
COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src src
RUN mvn install -DskipTests
RUN mkdir -p target/dependency && (cd target/dependency; jar -xf ../*.jar)

FROM node as frontend-build
WORKDIR /usr/src/app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

FROM openjdk:8-jdk-alpine
VOLUME /tmp
ARG DEPENDENCY=/fullstack/backend/target/dependency
COPY --from=backend-build ${DEPENDENCY}/BOOT-INF/lib /app/lib
COPY --from=backend-build ${DEPENDENCY}/META-INF /app/META-INF
COPY --from=backend-build ${DEPENDENCY}/BOOT-INF/classes /app
COPY --from=frontend-build /usr/src/app/build /app/classes/public

ENTRYPOINT ["java", "-cp", "app:app/lib/*:app/classes", "-Dserver.port=8001 -Dspring.profiles.active=default,mem", "com.sum.AuthenticationApplication"]