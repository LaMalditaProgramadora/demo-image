package com.example.demoImage.service.impl;

import java.util.List;

import com.example.demoImage.model.Meme;
import com.example.demoImage.repository.IMemeRepository;
import com.example.demoImage.service.IMemeService;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemeServiceImpl implements IMemeService {

    @Autowired
    private IMemeRepository memeRepository;

    @Override
    public void save(Meme meme) {
        memeRepository.save(meme);
    }

    @Override
    public List<Meme> listAll() {
        return memeRepository.findAll();
    }

    @Override
    public void deleteById(int id) {
        memeRepository.deleteById(id);
    }

    @Override
    public Meme listById(int id) {
        return memeRepository.findById(id).get();
    }

    @Override
    public Meme convertJsonToMeme(String stringMeme) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        Meme meme = objectMapper.readValue(stringMeme, Meme.class);
        return meme;
    }

}
