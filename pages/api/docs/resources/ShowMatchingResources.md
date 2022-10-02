## **Show Matching Resources**

Returns json data about all resources that match the provided criteria.

- **URL**

  /resources

- **Method:**

  `POST`

- **URL Params**

  **Required:**

  None

- **Data Params**

  ```javascript
  { data: string }
  ```
  `data` represents the quiz responses encrypted in AES with a secret passphrase.

- **Success Response:**

  - **Code:** 200  
    **Content:**  
    ```javascript
    [{
      id: string;
      name: string;
      description: string;
      incomeLevel: number;
      employed: boolean;
    }]
    ```

- **Error Response:**

  None
