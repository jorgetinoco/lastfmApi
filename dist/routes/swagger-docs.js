/**
   * @swagger
   *  /artists:
   *    get:
   *      tags:
   *        - Artist
   *      description: Return list of top 20 artists
   *      produces:
   *        - application/json
   *      responses:
   *        200:
   *          description: List of top 20 artists
   *          schema:
   *            type: array
   *            items:
   *              type: object
   *              properties:
   *                artist:
   *                  type: string
   *                images:
   *                  type: array
   *                  items:
   *                    type: object
   *                    properties:
   *                      text:
   *                        type: string
   *                      size:
   *                        type: string
   *        default:
   *          description: Unexpected error
   *          schema:
   *            type: object
   *            properties:
   *              error:
   *                type: string
   *              message:
   *                type: string
   *              links:
   *                type: array
   *                items:
   *                  type: string
   */

/**
   * @swagger
   *  /artist/{artistName}:
   *    parameters:
   *      - artistName:
   *        name: artistName
   *        description: artist name to search
   *        in: path
   *        required: true
   *        type: string
   *    get:
   *      tags:
   *        - Artist
   *      description: Return artist matching name
   *      produces:
   *        - application/json
   *      responses:
   *        200:
   *          description: Artist matching param
   *          schema:
   *            type: object
   *            properties:
   *              artist:
   *                type: object
   *                properties:
   *                  name:
   *                    type: string
   *                  url:
   *                    type: string
   *                  image:
   *                    type: string
   *                  onTour:
   *                    type: string
   *                  similarArtist:
   *                    type: array
   *                    items:
   *                      type: string
   *                  tags:
   *                    type: array
   *                    items:
   *                      type: string
   *                  bio:
   *                    type: string
   *        default:
   *          description: Unexpected error
   *          schema:
   *            type: object
   *            properties:
   *              error:
   *                type: string
   *              message:
   *                type: string
   *              links:
   *                type: array
   *                items:
   *                  type: string
   */

/**
   * @swagger
   *  /artist/{artistName}/albums:
   *    parameters:
   *      - artistName:
   *        name: artistName
   *        description: artist name to get top 5 albums
   *        in: path
   *        required: true
   *        type: string
   *    get:
   *      tags:
   *        - Artist
   *      description: Return artist's top 5 albums
   *      produces:
   *        - application/json
   *      responses:
   *        200:
   *          description: Artist top 5 albums
   *          schema:
   *            type: array
   *            items:
   *              type: object
   *              properties:
   *                album:
   *                  type: string
   *                artist:
   *                  type: string
   *                playcount:
   *                  type: number
   *                images:
   *                  type: array
   *                  items:
   *                    type: object
   *                    properties:
   *                      text:
   *                        type: string
   *                      size:
   *                        type: string
   *        default:
   *          description: Unexpected error
   *          schema:
   *            type: object
   *            properties:
   *              error:
   *                type: string
   *              message:
   *                type: string
   *              links:
   *                type: array
   *                items:
   *                  type: string
   */

/**
   * @swagger
   *  /songs:
   *    get:
   *      tags:
   *        - Song
   *      description: Returns the top 50 songs
   *      produces:
   *        - application/json
   *      responses:
   *        200:
   *          description: List of top 50 songs
   *          schema:
   *            type: object
   *            properties:
   *              track:
   *                type: array
   *                items:
   *                  type: object
   *                  properties:
   *                    name:
   *                      type: string
   *                    playcount:
   *                      type: string
   *                    artist:
   *                      type: string
   *                    image:
   *                      type: array
   *                      items:
   *                        type: object
   *                        properties:
   *                          text:
   *                            type: string
   *                          size:
   *                            type: string
   *        default:
   *          description: Unexpected error
   *          schema:
   *            type: object
   *            properties:
   *              error:
   *                type: string
   *              message:
   *                type: string
   *              links:
   *                type: array
   *                items:
   *                  type: string
   */

/**
   * @swagger
   *  /song/{songName}:
   *    parameters:
   *      - songName:
   *        name: songName
   *        description: song name to search
   *        in: path
   *        required: true
   *        type: string
   *    get:
   *      tags:
   *        - Song
   *      description: Return max 10 songs matching the param name
   *      produces:
   *        - application/json
   *      responses:
   *        200:
   *          description: Songs matching param name
   *          schema:
   *            type: object
   *            properties:
   *              track:
   *                type: array
   *                items:
   *                  type: object
   *                  properties:
   *                    name:
   *                      type: string
   *                    artist:
   *                      type: string
   *                    url:
   *                      type: string
   *                    listeners:
   *                      type: string
   *                    image:
   *                      type: string
   *        default:
   *          description: Unexpected error
   *          schema:
   *            type: object
   *            properties:
   *              error:
   *                type: string
   *              message:
   *                type: string
   *              links:
   *                type: array
   *                items:
   *                  type: string
   */

/**
   * @swagger
   *  /song/{songName}/artist/{artistName}:
   *    parameters:
   *      - songName:
   *        name: songName
   *        description: song name to search
   *        in: path
   *        required: true
   *        type: string
   *      - artistName:
   *        name: artistName
   *        description: artist name to search
   *        in: path
   *        required: true
   *        type: string
   *    get:
   *      tags:
   *        - Song
   *      description: Return song matching song name and artist name
   *      produces:
   *        - application/json
   *      responses:
   *        200:
   *          description: Song matching params
   *          schema:
   *            type: object
   *            properties:
   *              track:
   *                type: object
   *                properties:
   *                  name:
   *                    type: string
   *                  url:
   *                    type: string
   *                  duration:
   *                    type: number
   *                  listeners:
   *                    type: string
   *                  artist:
   *                    type: object
   *                    properties:
   *                      name:
   *                        type: string
   *                      url:
   *                        type: string
   *                  tags:
   *                    type: array
   *                    items:
   *                      type: string
   *                  wiki:
   *                    type: object
   *                    properties:
   *                      published:
   *                        type: string
   *                      summary:
   *                        type: string
   *                      content:
   *                        type: string
   *        default:
   *          description: Unexpected error
   *          schema:
   *            type: object
   *            properties:
   *              error:
   *                type: string
   *              message:
   *                type: string
   *              links:
   *                type: array
   *                items:
   *                  type: string
   */
"use strict";