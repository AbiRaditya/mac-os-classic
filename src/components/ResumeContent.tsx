import React from "react";

const ResumeContent: React.FC = () => {
  return (
    <div
      className="p-4 text-xs bg-white text-black overflow-y-auto h-full"
      style={{ fontFamily: "Tahoma, Arial, sans-serif" }}
    >
      <header className="text-center mb-4">
        <h1 className="text-lg font-bold">ABI RADITYA PUTRA FALAKI</h1>
        <p className="text-sm">SOFTWARE ENGINEER</p>
        <p className="text-xs">
          +62 878 8506 0121 | abi.radithya@gmail.com | South Jakarta, Indonesia
        </p>
        <p className="text-xs">
          <a
            href="https://www.linkedin.com/in/abi-raditya"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            linkedin.com/in/abi-raditya
          </a>
        </p>
        <div className="mt-2">
          <a
            href="https://object.sys.falaki.cloud/general/Abi_Raditya_Putra_Falaki_Software_Engineer.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="Abi_Raditya_Putra_Falaki_Software_Engineer.pdf"
            className="inline-block bg-gray-200 hover:bg-gray-300 text-black py-1 px-3 text-xs border border-gray-400"
            style={{ fontFamily: "Tahoma, Arial, sans-serif" }}
          >
            Download Resume
          </a>
        </div>
      </header>

      <section className="mb-3">
        <h2 className="text-sm font-bold border-b border-black mb-1">
          PROFESSIONAL SUMMARY
        </h2>
        <p>
          Software Engineer with 3+ years of experience specializing in
          Typescript, NestJS, PostgreSQL, AWS, Vue/Nuxt, And React/NextJS.
          Proven track record in building scalable web and mobile applications,
          integrating third-party APIs, and leading engineering teams. A
          passionate, innovative team player committed to quality, continuous
          learning, adaptability, and solving complex challenges with analytical
          precision. Eager to leverage expertise in modern development practices
          to drive impactful results in a dynamic and fast-growing organization.
        </p>
      </section>

      <section className="mb-3">
        <h2 className="text-sm font-bold border-b border-black mb-1">
          WORK EXPERIENCE
        </h2>
        <div className="mb-2">
          <h3 className="text-xs font-bold">
            Senior Engineering Lead, BRIK (Ready-Mix Concrete Startup)
          </h3>
          <p className="text-xs italic">2024 - Present</p>
          <ul className="list-disc list-inside ml-2 text-xs">
            <li>
              Led a team of 7, including 5 fullstack engineers, 1 mobile
              engineer, and 1 UI/UX designer, overseeing end-to-end development
              processes and ensuring delivery of high-impact features.
            </li>
            <li>
              Report directly to the CTO, aligning technical execution with
              business goals and contributing to strategic planning and
              technical decision-making.
            </li>
            <li>
              Implemented an MDVR (Mobile Digital Video Recorder) system in
              truck mixers, enabling real-time location tracking and live camera
              feeds for dispatch teams via device GPS and onboard cameras,
              improving fleet visibility and operational safety.
            </li>
            <li>
              Spearheaded the implementation of HyperDX for centralized logging,
              distributed tracing, and error tracking, deploying it using Docker
              Swarm and AWS services (ECR for container registry and EC2 for
              compute resources).
            </li>
            <li>
              Designed and implemented advanced PostgreSQL solutions, including
              an audit logging system using database triggers and functions to
              automatically capture and record changes in critical tables.
              Optimized query performance and data integrity through strategic
              indexing, efficient schema design, and query tuning.
            </li>
            <li>
              Integrated Jira into the developers workflow, creating detailed
              tickets with requirements and user stories to streamline project
              management and improve team efficiency.
            </li>
            <li>
              Led all ongoing projects, providing technical guidance, resolving
              challenges, and mentoring developers on new concepts, tools, and
              best practices to ensure team growth and project success.
            </li>
          </ul>
        </div>
        <div className="mb-2">
          <h3 className="text-xs font-bold">
            Fullstack Engineer, BRIK (Ready-Mix Concrete Startup)
          </h3>
          <p className="text-xs italic">2022 - 2024</p>
          <ul className="list-disc list-inside ml-2 text-xs">
            <li>
              Developed a mobile app (React Native, Typescript) for sales teams
              to create project site visitations with location capture and photo
              upload.
            </li>
            <li>
              Built a customer-facing website (Nuxt.js, Nestjs, TypeScript) for
              ordering ready-mix concrete, scheduling deliveries, and live order
              tracking.
            </li>
            <li>
              Designed features for sales reps to create on-the-spot orders and
              for QC technicians to access real-time testing forms.
            </li>
            <li>
              Integrated Google Maps for live delivery tracking and streamlined
              sales tools (target tracking, visitation history, order
              management).
            </li>
            <li>
              Created systems for managing customer data, delivery schedules,
              and admin operations.
            </li>
            <li>
              Created a scheduling system for managing delivery orders for
              concrete, improving logistics coordination.
            </li>
            <li>
              Integrate the Quotation, Sale Order, Delivery Order internal
              system with Accurate Online API.
            </li>
            <li>
              Led the design and implementation of a dynamic SKU creation system
              tailored for the ready-mix concrete business, enabling scalable
              management of over 10,000 unique SKUs based on customizable
              product attributes.
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-bold">
            Frontend Developer, Mandaya Hospital Group (Hospital)
          </h3>
          <p className="text-xs italic">2021 - 2022</p>
          <ul className="list-disc list-inside ml-2 text-xs">
            <li>
              Developed the front-end for a doctor scheduling system using Vue,
              enabling users to create, view, edit, and delete schedules, block
              time slots, and manage patient check-ins (online/offline).
            </li>
            <li>
              Implemented front-end features for updating doctor appointments,
              including rescheduling and cancellations.
            </li>
            <li>
              Built the user interface for managing hospital specialists,
              serving as a CMS for the mobile app.
            </li>
            <li>
              Collaborated with the design team to create an intuitive and
              responsive user interface for the telemedicine platform.
            </li>
            <li>
              Contributed to the front-end development of a telemedicine web
              app, integrating real-time video calls and chat using Vonage and
              WebSockets.
            </li>
          </ul>
        </div>
      </section>

      <section className="mb-3">
        <h2 className="text-sm font-bold border-b border-black mb-1">
          EDUCATION
        </h2>
        <div className="mb-1">
          <h3 className="text-xs font-bold">Trisakti University</h3>
          <p className="text-xs">
            Bachelor of Engineering, Electrical And Computer Systems
          </p>
          <p className="text-xs italic">
            Computer Lab Assistant, Assistant Lecturer in Microcontroller.
          </p>
          <p className="text-xs italic">
            Electrical Engineering, Student Association Member.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-sm font-bold border-b border-black mb-1">
          ADDITIONAL INFORMATION
        </h2>
        <div className="grid grid-cols-2 gap-x-4 text-xs">
          <div>
            <h4 className="font-semibold">Languages:</h4>
            <p>TypeScript, JavaScript, SQL</p>
          </div>
          <div>
            <h4 className="font-semibold">Frontend:</h4>
            <p>
              Next.js, Vue.js, Nuxt.js, React, Redux, Pinia, Vuex, React Native
            </p>
          </div>
          <div>
            <h4 className="font-semibold">Backend:</h4>
            <p>
              Fastify, NestJS, Express.js, Sequelize, TypeORM, WebSockets,
              Postgresql, MongoDB
            </p>
          </div>
          <div>
            <h4 className="font-semibold">DevOps/Cloud:</h4>
            <p>
              AWS (EC2, S3, ECR, CloudFront, Route 53), Docker Swarm, CircleCI,
              Traefik
            </p>
          </div>
          <div>
            <h4 className="font-semibold">Tools:</h4>
            <p>Git, Jira, BitBucket, HyperDX (Open Telemetry)</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResumeContent;
