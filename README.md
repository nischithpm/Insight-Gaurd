<h1 align="center" id="title">Insight-Guard</h1>




# Insight Guard

A Chronic eye disorder called glaucoma leading to irreversible blindness by damaging the optic
nerve of the eye. It is provoked due to exalted intraocular pressure inside the eye. Detecting glaucoma is the
most challenging process in case of open angle glaucoma (OAG) due to lack of initial symptoms.We have developed a Full Stack Application called Insight Guard to detect the disease with the help of the Machine Learning and Image Processing Library OpenCV

# Architecture Diagram
![Gluacoma_Architecture_Diagram (2)](https://github.com/Younus-Saberi/Insight-Guard/assets/73644685/4c81be59-56e5-4acf-8624-9dd54aa9a464)


## Installation

Clone the project locally

```bash
  git clone https://github.com/Younus-Saberi/Insight-Guard
```
### Change the Directory to Backend
```bash
cd Backend
```
Create a Python Virtual Enviorment
```bash
python -m venv .venv
```
Activate the Enviorment in Windows
```bash
source .venv/Scripts/activate
```
Run the Backend Django Server
```bash
python manage.py runserver
```
### Chnage to Frontend Directory
Install the Dependancies
```bash
npm install
```
Run the server up
```bash
npm run dev
```



## Run Locally through Docker

Clone the project

```bash
  git clone https://github.com/Younus-Saberi/Insight-Guard
```

Go to the project directory

```bash
  cd Insight-Guard
```

Run the Docker Compose File

```bash
  docker compose up 
```



## Tech Stack

**Client:** React, Redux, TailwindCSS

**Server:** Django, Python, AWS


## API Reference

#### Get all items

```http
  POST /api/predict
```

| Body Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `image` | `Form-Fields` | **Required**. image |

#### Get item

```http
  GET /api/cdr/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `iamge_id`      | `int` | **Required**. Id of Image to Compute |




## Screenshots

![Screenshot 2024-04-28 195426](https://github.com/Younus-Saberi/Insight-Guard/assets/73644685/c7883fa2-6420-4a96-a992-2b28023edec7)
![Screenshot 2024-04-28 193340](https://github.com/Younus-Saberi/Insight-Guard/assets/73644685/8af460df-4b33-447c-aaa9-dc4fd8cc446b)

![Screenshot 2024-04-28 222730](https://github.com/Younus-Saberi/Insight-Guard/assets/73644685/605f8e63-62ec-43c1-bda9-6620e385d2c2)
![Screenshot 2024-04-28 193553](https://github.com/Younus-Saberi/Insight-Guard/assets/73644685/2b907b59-52c4-4a26-982d-2f784c82ba89)
![Screenshot 2024-05-08 161731](https://github.com/Younus-Saberi/Insight-Guard/assets/73644685/26bde037-55ea-4395-8d55-c7ef3a48afc9)

![Screenshot 2024-04-17 132308](https://github.com/Younus-Saberi/Insight-Guard/assets/73644685/59927ad2-1235-4b4b-b156-a5babed2c1ff)
![Screenshot 2024-04-28 195230](https://github.com/Younus-Saberi/Insight-Guard/assets/73644685/9f2f98e2-0a13-42c2-9e16-b5eb6d515f11)
## Demonstration Video Link 
Google Drive Link: [Click Here](https://drive.google.com/file/d/15wdAXgFOJqEPij3luQAT-vDB5Bsfwzr7/view?usp=sharing)

## Environment Variables


To run this project, you will need to add the following environment variables to your .env file

`Google Gemini API_KEY`

`Google OAuth API_KEY`

`AWS_SECERT_KEY`

`AWS_ACCESS_KEY`

`AWS_BUCKET_NAME`


## Support

For support, email nischithpm23@gmail.com 
Contact me at [Linkedin]([https://www.linkedin.com/in/nischith-pm-6a20aa261?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app])


## Documentation

[Documentation](https://ijcrt.org/papers/IJCRT2403694.pdf)


## License

[MIT](https://choosealicense.com/licenses/mit/)



TASK LIST
- [x] Make Basic File upload.
- [x] Make validation before upload.
- [x] Refactor image after upload.
- [x] Make model predict.
- [x] Draw Eclipse with Opencv2.
- [x] Upload image to s3.

- Download our ML model using the link [here](https://drive.google.com/file/d/19NnGMA99WZls7KM4sJ7jArz7dFzXJKnF/view?usp=drive_link)
- List of Model Folder in [Google Drive](https://drive.google.com/drive/folders/1jX9-Ckk1CHz3q4eT8JAesepXoGVXiCqt?usp=sharing)
- List of Resource Materials [here](https://github.com/Younus-Saberi/GlaucomaDetection/tree/master/resources)
