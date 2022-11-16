package com.example.demoImage.service;

import java.util.List;

import com.example.demoImage.model.Meme;
import com.fasterxml.jackson.core.JsonProcessingException;

public interface IMemeService {
	void save(Meme meme);
	List<Meme> listAll();
	void deleteById(int id);
	Meme listById(int id);
	Meme convertJsonToMeme(String stringMeme) throws JsonProcessingException;
}
