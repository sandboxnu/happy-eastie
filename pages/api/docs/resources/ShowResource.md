## **Show Resource**

Returns json data about a single resource.

- **URL**

  /resources/:id

- **Method:**

  `GET`

- **URL Params**

  **Required:**

  `id=[string]`

- **Data Params**

  None

- **Success Response:**

  - **Code:** 200  
    **Content:**  
    ```javascript
    {
      id: string;
      name: string;
      description: string;
      incomeLevel: number;
      employed: boolean;
    }
    ```

- **Error Response:**

  - **Code:** 404 NOT FOUND  
    **Content:** `{ error : "Resource :id not found" }`

  OR

  - **Code:** 400 BAD REQUEST  
    **Content:** `{ error : "Invalid resourceId: must be of type string" }`
