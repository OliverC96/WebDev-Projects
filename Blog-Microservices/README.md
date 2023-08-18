<h3> Blog Application </h3>
<ul>
  <li> A simple blog application implemented as a collection of loosely-coupled, independently-deployed microservices: 
  <ul>
    <li> <b>Posts service</b>, responsible for managing the creation and deletion of blog posts </li>
    <li> <b>Comments service</b>, responsible for managing the creation and deletion of comments </li>
    <li> <b>Moderation service</b>, responsible for the moderation of post comments (based on a group of prohibited terms) </li>
    <li> <b>Query service</b>, providing the frontend with an efficient/comprehensive method of accessing application data </li>
    <li> <b>Event bus</b>, responsible for managing an application-wide event queue (receiving incoming events, and then emitting/forwarding them to the appropriate microservice) </li>
  </ul>
  </li>
  <li> This application has been containerized with Docker, and can be deployed and managed with Kubernetes and Skaffold 
    <ul>
      <li> Navigate to <i> ./infra/k8s </i> to view Kubernetes configuration files for the deployments and services associated with each microservice container </li>
      <li> Note: <i>posts-srv.yaml</i> defines a NodePort service used only in the development process </li>
      <li> Note: <i>ingress-srv.yaml</i> defines an ingress-nginx configuration (LoadBalancer service)
    </ul>
  </li>
  <li> Frontend powered by React.js and styled with TailwindCSS; backend implemented in Node.js and Express.js </li>
  <li> This project was completed as part of the <a href="https://www.udemy.com/share/102VKE3@oJrOzUUFZM_w0sgLlxbBnv4sLJg79Jl53-nSVDBufA4RGbl5nsVkk5rbUwkmqAAoRw==/" target="_blank"> Microservices with Node JS and React </a> Udemy course </li>
</ul>
