package co.edu.icesi.pollafutbolera.unit.service;

import co.edu.icesi.pollafutbolera.config.PollaResponseEntity;
import co.edu.icesi.pollafutbolera.dto.SubPollaCreateDTO;
import co.edu.icesi.pollafutbolera.dto.SubPollaGetDTO;
import co.edu.icesi.pollafutbolera.dto.UserSubpollaDetailsDTO;
import co.edu.icesi.pollafutbolera.exception.SubPollaAccessDeniedException;
import co.edu.icesi.pollafutbolera.exception.SubPollaCreationException;
import co.edu.icesi.pollafutbolera.mapper.SubPollaMapper;
import co.edu.icesi.pollafutbolera.model.SubPolla;
import co.edu.icesi.pollafutbolera.model.User;
import co.edu.icesi.pollafutbolera.model.UserSubPolla;
import co.edu.icesi.pollafutbolera.repository.SubPollaRepository;
import co.edu.icesi.pollafutbolera.repository.UserRepository;
import co.edu.icesi.pollafutbolera.repository.UserSubPollaRepository;
import co.edu.icesi.pollafutbolera.service.SubPollaServiceImpl;
import co.edu.icesi.pollafutbolera.util.SubPollaUtil;
import co.edu.icesi.pollafutbolera.util.SubPollaJoinRequestUtil;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class SubPollaServiceTest {

    @Mock
    private SubPollaRepository repository;

    @Mock
    private SubPollaMapper mapper;

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserSubPollaRepository userSubPollaRepository;

    @InjectMocks
    private SubPollaServiceImpl service;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testFindById_Success() {
        SubPolla subPolla = new SubPolla();
        subPolla.setId(1L);
        SubPollaGetDTO dto = SubPollaGetDTO.builder().id(1L).isPrivate(true).pollaId(1L).build();

        when(repository.findById(1L)).thenReturn(Optional.of(subPolla));
        when(mapper.toDTO(subPolla)).thenReturn(dto);

        ResponseEntity<SubPollaGetDTO> response = service.findById(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(dto, response.getBody());
    }

    @Test
    void testFindById_NotFound() {
        when(repository.findById(1L)).thenReturn(Optional.empty());

        ResponseEntity<SubPollaGetDTO> response = service.findById(1L);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    void testSave_Success() {
        SubPollaCreateDTO createDTO = SubPollaCreateDTO.builder().isPrivate(true).pollaId(1L).build();
        SubPolla subPolla = new SubPolla();
        SubPolla savedSubPolla = new SubPolla();
        SubPollaGetDTO dto = SubPollaGetDTO.builder().id(1L).isPrivate(true).pollaId(1L).build();

        when(mapper.toEntity(createDTO)).thenReturn(subPolla);
        when(repository.save(subPolla)).thenReturn(savedSubPolla);
        when(mapper.toDTO(savedSubPolla)).thenReturn(dto);

        ResponseEntity<SubPollaGetDTO> response = service.save(createDTO);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(dto, response.getBody());
    }

    @Test
    void testSave_BadRequest() {
        SubPollaCreateDTO createDTO = SubPollaCreateDTO.builder().isPrivate(true).pollaId(1L).build();

        when(mapper.toEntity(createDTO)).thenThrow(new IllegalArgumentException("Invalid data"));

        try {
            ResponseEntity<SubPollaGetDTO> response = service.save(createDTO);
            assert false;
        }
        catch (SubPollaCreationException e) {
            assert true;
        }
    }

    @Test
    void testDelete_Success(){
        Long id = 1L;
        SubPolla subPolla = new SubPolla();
        subPolla.setId(id);

        when(repository.findById(id)).thenReturn(Optional.of(subPolla));
        doNothing().when(repository).deleteById(id);

        ResponseEntity<Void> response = service.deleteSubPolla(id);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(repository, times(1)).deleteById(id);
    }

    @Test
    void testDelete_NotFound(){
        Long id = 1L;

        when(repository.findById(id)).thenReturn(Optional.empty());
        try{
            ResponseEntity<Void> response = service.deleteSubPolla(id);
            assert false;
        }
        catch (RuntimeException e) {
            assert true;
        }
        verify(repository, never()).deleteById(id);
    }

    // ========== Tests for getUsersOfSubPollaIfAdmin ==========

    @Test
    void testGetUsersOfSubPollaIfAdmin_Success() {
        // Arrange
        Long subPollaId = 1L;
        String nickname = "adminuser";
        Long adminUserId = 2L;
        
        User admin = SubPollaJoinRequestUtil.admin();
        admin.setId(adminUserId);
        
        SubPolla subPolla = SubPollaJoinRequestUtil.subpolla(admin);
        subPolla.setId(subPollaId);
        
        User user1 = new User();
        user1.setId(1L);
        user1.setNickname("user1");
        user1.setMail("user1@test.com");
        user1.setName("John");
        user1.setLastName("Doe");
        
        User user2 = new User();
        user2.setId(3L);
        user2.setNickname("user2");
        user2.setMail("user2@test.com");
        user2.setName("Jane");
        user2.setLastName("Smith");
        
        UserSubPolla userSubPolla1 = UserSubPolla.builder()
                .user(user1)
                .subpolla(subPolla)
                .build();
        
        UserSubPolla userSubPolla2 = UserSubPolla.builder()
                .user(user2)
                .subpolla(subPolla)
                .build();
        
        List<UserSubPolla> usersInSubPolla = Arrays.asList(userSubPolla1, userSubPolla2);

        // Mock security context
        SecurityContext securityContext = mock(SecurityContext.class);
        UsernamePasswordAuthenticationToken authentication = 
                new UsernamePasswordAuthenticationToken(nickname, null);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        when(userRepository.findByNickname(nickname)).thenReturn(Optional.of(admin));
        when(userSubPollaRepository.findBySubpolla_Id(subPollaId)).thenReturn(usersInSubPolla);
        when(repository.findById(subPollaId)).thenReturn(Optional.of(subPolla));

        // Act
        List<UserSubpollaDetailsDTO> result = service.getUsersOfSubPollaIfAdmin(subPollaId);

        // Assert
        assertNotNull(result);
        assertEquals(2, result.size());
        
        UserSubpollaDetailsDTO dto1 = result.get(0);
        assertEquals(user1.getId(), dto1.getUserId());
        assertEquals(user1.getNickname(), dto1.getUsername());
        assertEquals(user1.getMail(), dto1.getEmail());
        assertEquals("John Doe", dto1.getFullName());
        assertEquals(subPollaId, dto1.getSubpollaId());
        
        UserSubpollaDetailsDTO dto2 = result.get(1);
        assertEquals(user2.getId(), dto2.getUserId());
        assertEquals(user2.getNickname(), dto2.getUsername());
        assertEquals(user2.getMail(), dto2.getEmail());
        assertEquals("Jane Smith", dto2.getFullName());
        assertEquals(subPollaId, dto2.getSubpollaId());

        verify(userRepository).findByNickname(nickname);
        verify(userSubPollaRepository).findBySubpolla_Id(subPollaId);
        verify(repository).findById(subPollaId);
    }

    @Test
    void testGetUsersOfSubPollaIfAdmin_UserNotFound() {
        // Arrange
        Long subPollaId = 1L;
        String nickname = "nonexistentuser";

        // Mock security context
        SecurityContext securityContext = mock(SecurityContext.class);
        UsernamePasswordAuthenticationToken authentication = 
                new UsernamePasswordAuthenticationToken(nickname, null);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        when(userRepository.findByNickname(nickname)).thenReturn(Optional.empty());

        // Act & Assert
        SubPollaAccessDeniedException exception = assertThrows(
                SubPollaAccessDeniedException.class,
                () -> service.getUsersOfSubPollaIfAdmin(subPollaId)
        );

        assertEquals("User not found with nickname: " + nickname, exception.getMessage());
        verify(userRepository).findByNickname(nickname);
        verify(userSubPollaRepository, never()).findBySubpolla_Id(anyLong());
        verify(repository, never()).findById(anyLong());
    }

    @Test
    void testGetUsersOfSubPollaIfAdmin_SubPollaNotFoundOrHasNoUsers() {
        // Arrange
        Long subPollaId = 1L;
        String nickname = "adminuser";
        User admin = SubPollaJoinRequestUtil.admin();

        // Mock security context
        SecurityContext securityContext = mock(SecurityContext.class);
        UsernamePasswordAuthenticationToken authentication = 
                new UsernamePasswordAuthenticationToken(nickname, null);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        when(userRepository.findByNickname(nickname)).thenReturn(Optional.of(admin));
        when(userSubPollaRepository.findBySubpolla_Id(subPollaId)).thenReturn(Collections.emptyList());

        // Act & Assert
        SubPollaAccessDeniedException exception = assertThrows(
                SubPollaAccessDeniedException.class,
                () -> service.getUsersOfSubPollaIfAdmin(subPollaId)
        );

        assertEquals("Subpolla not found or has no users.", exception.getMessage());
        verify(userRepository).findByNickname(nickname);
        verify(userSubPollaRepository).findBySubpolla_Id(subPollaId);
        verify(repository, never()).findById(anyLong());
    }

    @Test
    void testGetUsersOfSubPollaIfAdmin_AccessDenied_NotCreator() {
        // Arrange
        Long subPollaId = 1L;
        String nickname = "regularuser";
        Long regularUserId = 3L;
        Long adminUserId = 2L;
        
        User regularUser = new User();
        regularUser.setId(regularUserId);
        regularUser.setNickname(nickname);
        
        User admin = SubPollaJoinRequestUtil.admin();
        admin.setId(adminUserId);
        
        SubPolla subPolla = SubPollaJoinRequestUtil.subpolla(admin);
        subPolla.setId(subPollaId);
        
        UserSubPolla userSubPolla = UserSubPolla.builder()
                .user(regularUser)
                .subpolla(subPolla)
                .build();
        
        List<UserSubPolla> usersInSubPolla = Arrays.asList(userSubPolla);

        // Mock security context
        SecurityContext securityContext = mock(SecurityContext.class);
        UsernamePasswordAuthenticationToken authentication = 
                new UsernamePasswordAuthenticationToken(nickname, null);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        when(userRepository.findByNickname(nickname)).thenReturn(Optional.of(regularUser));
        when(userSubPollaRepository.findBySubpolla_Id(subPollaId)).thenReturn(usersInSubPolla);
        when(repository.findById(subPollaId)).thenReturn(Optional.of(subPolla));

        // Act & Assert
        SubPollaAccessDeniedException exception = assertThrows(
                SubPollaAccessDeniedException.class,
                () -> service.getUsersOfSubPollaIfAdmin(subPollaId)
        );

        assertEquals("No estás autorizado para ver los usuarios de esta subpolla.", exception.getMessage());
        verify(userRepository).findByNickname(nickname);
        verify(userSubPollaRepository).findBySubpolla_Id(subPollaId);
        verify(repository).findById(subPollaId);
    }

    // ========== Tests for removeUserFromSubPolla ==========

    @Test
    void testRemoveUserFromSubPolla_Success() {
        // Arrange
        Long subPollaId = 1L;
        Long userIdToRemove = 3L;
        String adminNickname = "adminuser";
        Long adminUserId = 2L;
        
        User admin = SubPollaJoinRequestUtil.admin();
        admin.setId(adminUserId);
        
        SubPolla subPolla = SubPollaJoinRequestUtil.subpolla(admin);
        subPolla.setId(subPollaId);

        // Mock security context
        SecurityContext securityContext = mock(SecurityContext.class);
        UsernamePasswordAuthenticationToken authentication = 
                new UsernamePasswordAuthenticationToken(adminNickname, null);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        when(userRepository.findByNickname(adminNickname)).thenReturn(Optional.of(admin));
        when(repository.findById(subPollaId)).thenReturn(Optional.of(subPolla));
        doNothing().when(userSubPollaRepository).deleteByUser_IdAndSubpolla_Id(userIdToRemove, subPollaId);

        // Act
        ResponseEntity<Void> response = service.removeUserFromSubPolla(subPollaId, userIdToRemove);

        // Assert
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(userRepository).findByNickname(adminNickname);
        verify(repository).findById(subPollaId);
        verify(userSubPollaRepository).deleteByUser_IdAndSubpolla_Id(userIdToRemove, subPollaId);
    }

    @Test
    void testRemoveUserFromSubPolla_UserNotFound() {
        // Arrange
        Long subPollaId = 1L;
        Long userIdToRemove = 3L;
        String nickname = "nonexistentuser";

        // Mock security context
        SecurityContext securityContext = mock(SecurityContext.class);
        UsernamePasswordAuthenticationToken authentication = 
                new UsernamePasswordAuthenticationToken(nickname, null);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        when(userRepository.findByNickname(nickname)).thenReturn(Optional.empty());

        // Act & Assert
        SubPollaAccessDeniedException exception = assertThrows(
                SubPollaAccessDeniedException.class,
                () -> service.removeUserFromSubPolla(subPollaId, userIdToRemove)
        );

        assertEquals("User not found with nickname: " + nickname, exception.getMessage());
        verify(userRepository).findByNickname(nickname);
        verify(repository, never()).findById(anyLong());
        verify(userSubPollaRepository, never()).deleteByUser_IdAndSubpolla_Id(anyLong(), anyLong());
    }

    @Test
    void testRemoveUserFromSubPolla_SubPollaNotFound() {
        // Arrange
        Long subPollaId = 1L;
        Long userIdToRemove = 3L;
        String adminNickname = "adminuser";
        User admin = SubPollaJoinRequestUtil.admin();

        // Mock security context
        SecurityContext securityContext = mock(SecurityContext.class);
        UsernamePasswordAuthenticationToken authentication = 
                new UsernamePasswordAuthenticationToken(adminNickname, null);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        when(userRepository.findByNickname(adminNickname)).thenReturn(Optional.of(admin));
        when(repository.findById(subPollaId)).thenReturn(Optional.empty());

        // Act & Assert
        EntityNotFoundException exception = assertThrows(
                EntityNotFoundException.class,
                () -> service.removeUserFromSubPolla(subPollaId, userIdToRemove)
        );

        assertEquals("Subpolla not found", exception.getMessage());
        verify(userRepository).findByNickname(adminNickname);
        verify(repository).findById(subPollaId);
        verify(userSubPollaRepository, never()).deleteByUser_IdAndSubpolla_Id(anyLong(), anyLong());
    }

    @Test
    void testRemoveUserFromSubPolla_AccessDenied_NotCreator() {
        // Arrange
        Long subPollaId = 1L;
        Long userIdToRemove = 3L;
        String regularUserNickname = "regularuser";
        Long regularUserId = 4L;
        Long adminUserId = 2L;
        
        User regularUser = new User();
        regularUser.setId(regularUserId);
        regularUser.setNickname(regularUserNickname);
        
        User admin = SubPollaJoinRequestUtil.admin();
        admin.setId(adminUserId);
        
        SubPolla subPolla = SubPollaJoinRequestUtil.subpolla(admin);
        subPolla.setId(subPollaId);

        // Mock security context
        SecurityContext securityContext = mock(SecurityContext.class);
        UsernamePasswordAuthenticationToken authentication = 
                new UsernamePasswordAuthenticationToken(regularUserNickname, null);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        when(userRepository.findByNickname(regularUserNickname)).thenReturn(Optional.of(regularUser));
        when(repository.findById(subPollaId)).thenReturn(Optional.of(subPolla));

        // Act & Assert
        AccessDeniedException exception = assertThrows(
                AccessDeniedException.class,
                () -> service.removeUserFromSubPolla(subPollaId, userIdToRemove)
        );

        assertEquals("Solo el creador puede eliminar usuarios de esta subpolla.", exception.getMessage());
        verify(userRepository).findByNickname(regularUserNickname);
        verify(repository).findById(subPollaId);
        verify(userSubPollaRepository, never()).deleteByUser_IdAndSubpolla_Id(anyLong(), anyLong());
    }
}