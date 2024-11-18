# Spring-boot-data-H2-embedded

应用程序

**application.properties**

```properties
spring.datasource.url=jdbc:h2:mem:TEST;DB_CLOSE_DELAY=-1;
spring.datasource.username=sa
spring.datasource.password=
spring.datasource.driver-class-name=org.h2.Driver
spring.datasource.platform=h2
spring.jpa.hibernate.ddl-auto=none
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.H2Dialect
```

单一接口:

```java
public interface EmployeeService extends JpaRepository<Employee, Integer> {
}
```

**不使用 Docker 运行**

```bash
> mvn clean install
> java -jar target/spring-h2-demo.jar
```

**使用 Docker 运行**

```bash
> mvn clean install
> docker build -t springboot-h2-sample
> docker run -d -p 8080:8080 springboot-h2-sample

> docker stop <image-name>
```
