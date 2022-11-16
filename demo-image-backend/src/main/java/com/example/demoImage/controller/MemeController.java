package com.example.demoImage.controller;

import java.net.MalformedURLException;
import java.util.List;

import com.example.demoImage.model.Meme;
import com.example.demoImage.service.IMemeService;
import com.example.demoImage.service.IUploadFileService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@RestController
@RequestMapping("/memes")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MemeController {

	@Autowired
	private IMemeService memeService;

	@Autowired
	private IUploadFileService uploadFileService;

	@GetMapping
	public ResponseEntity<?> listAll() {
		try {
			List<Meme> memes = memeService.listAll();
			return ResponseEntity.ok(memes);
		} catch (Exception e) {
			return ResponseEntity.internalServerError().body(e);
		}
	}

	@PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE,MediaType.MULTIPART_FORM_DATA_VALUE })
	public ResponseEntity<?> create(@RequestPart("meme") String stringMeme, @RequestPart("file") MultipartFile image){
	try {
		Meme meme = memeService.convertJsonToMeme(stringMeme);
		if (!image.isEmpty()) {
			if (meme.getId() > 0 && meme.getImageUrl() != null && meme.getImageUrl().length() > 0) {
				uploadFileService.delete(meme.getImageUrl());
			}
			String imageUrl = uploadFileService.copy(image);
			meme.setImageUrl(imageUrl);
		}
		memeService.save(meme);
		return ResponseEntity.ok(null);
	} catch (Exception e) {
		return ResponseEntity.internalServerError().body(e);
	}
	}

	@GetMapping(value = "/uploads/{filename}")
	public ResponseEntity<Resource> goImage(@PathVariable String filename) {
		Resource resource = null;
		try {
			resource = uploadFileService.load(filename);
		} catch (MalformedURLException e) {
			e.printStackTrace();
		}
		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
				.body(resource);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteById(@PathVariable int id) {
		try {
			Meme meme = memeService.listById(id);
			memeService.deleteById(id);
			uploadFileService.delete(meme.getImageUrl());
			return ResponseEntity.ok(null);
		} catch (Exception e) {
			return ResponseEntity.internalServerError().body(e);
		}
	}
}
