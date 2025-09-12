package co.edu.icesi.pollafutbolera.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class SubPollaAccessDeniedException extends RuntimeException {
    public SubPollaAccessDeniedException(String message) {
        super(message);
    }
}
