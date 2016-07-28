# Sojourner
…to semiboldy mars where others have marsed before.

This runs on port 1996 if you run locally (for the year Sojourner was launched of course) and can be found running on default HTTP 80 at http://sojourner.zjr.io.

**Get Rover**
----
  Creates and returns a 'new' rover object.

* **URL**

  `/rover`

* **Method:**
  
  `GET`
  
* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{ id: 12, x: 0, y: 0, direction: 'N' }`

* **Sample Call:**

  `curl -X GET "http://sojourner.zjr.io/rover"`

**Rotate Rover**
----
  Rotates a given rover to the right or left.

* **URL**

  `/rover/{id}/rotate`

* **Method:**
  
  `PUT`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Query Params**

  **Required:**
  
  `direction=[string <right, left>]`

* **Success Response:**
  
  Returns rover with updated cardinal direction.
 
* **Sample Call:**

  `curl -X PUT "http://sojourner.zjr.io/rover/1/rotate?direction=right"`
  
* **Notes:**

  These query params definitely could have been better as body params…

**Move Rover**
----
  Moves a given rover forward or backward.

* **URL**

  `/rover/{id}/move`

* **Method:**
  
  `PUT`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Query Params**

  **Required:**
  
  `direction=[string <forward, backward>]`

* **Success Response:**
  
  Returns rover with updated coordinates.
 
* **Error Response:**

  This route can fail if an obstacle is encountered.

  * **Code:** 500 <br />
    **Content:** `{ http_code: 500, code: 101, message: 'Obstacle encountered at 3, 0' }`
    
* **Sample Call:**

  `curl -X PUT "http://sojourner.zjr.io/rover/1/move?direction=forward"`
  
* **Notes:**

  These query params definitely could have been better as body params…
 
**Queue Commands**
----
  Send multiple move and rotate commands in batches.

* **URL**

  `/rover/{id}/cmd-queue`

* **Method:**
  
  `PUT`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Body Params**

  **Required:**
  
  ```
  { "cmds": [
    { "cmd": "move", value: "forward" },
    { "cmd": "rotate", value: "right" },
    { "cmd": "move", value: "forward" }
  ]}
  ```
  
  can also be shortened like:
  
  ```
  { "cmds": [
    { "cmd": "m", value: "forward" },
    { "cmd": "r", value: "right" },
    { "cmd": "m", value: "forward" }
  ]}
  ```

* **Success Response:**
  
  Returns rover with updated coordinates and facing direction.
 
* **Error Response:**

  This route can fail if an obstacle is encountered.

  * **Code:** 500 <br />
    **Content:** `{ http_code: 500, code: 101, message: 'Obstacle encountered at 3, 0' }`

* **Sample Call:**

  ```
  curl -X PUT -H "Content-Type: application/json" -d '{ "cmds": [
      { "cmd": "move", value: "forward" },
      { "cmd": "rotate", value: "right" },
      { "cmd": "move", value: "forward" }
  ]}' "http://sojourner.zjr.io/rover/1/cmd-queue"
  ```
  
* **Notes:**

  Body params are in JSON only
