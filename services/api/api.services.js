// let API_URL = {process.env.API_URL ? process.env.API_URL : "https://app.resurfacehub.com" }
module.exports = appglobal = {
  api: {
    base_api: "https://staging.resurfacehub.com",
    aws: "https://resurface-s3.s3.ap-southeast-1.amazonaws.com/",

    // Auth Endpoint
    login: "/api/auth/login",
    register: "/api/auth/signup",
    logout: "/api/auth/logout",
    forgot_password: "/api/auth/forgot_password",
    reset_password: "/api/auth/reset",

    // Clinician Endpoint
    get_profile: "/api/auth/clinicians/",
    search_profile: "/api/auth/clinicians?",
    get_all_clinicians: "/api/auth/clinicians",
    get_all_clinician_withoutPagination: "/api/auth/get-all-clinicians",
    add_clinician: "/api/auth/clinicians",
    update_clinician: "/api/auth/clinicians/",
    delete_clinician: "/api/auth/clinicians/",
    update_clinicians: "/api/auth/clinicians/update-clinicians",
    FilterLocationClinician: "/api/auth/getCliniciansBasedOnLocation",

    // Event Endpoint
    get_events: "/api/auth/events",
    add_event: "/api/auth/events",
    update_event: "/api/auth/events/",
    delete_event: "/api/auth/events/",

    // Time Entries Endpoin
    get_all_time_entries: "/api/auth/time-entries",
    add_time_entries: "/api/auth/time-entries",
    update_time_entries: "/api/auth/time-entries/",
    delete_time_entries: "/api/auth/time-entries/",

    // Location Endpoint
    get_all_location: "/api/auth/locations",
    add_location: "/api/auth/locations ",
    update_location: "/api/auth/locations/",
    delete_location: "/api/auth/locations/",

    // Business Endpoint
    get_all_business: "/api/auth/business-locations",
    add_business: "/api/auth/business-locations",
    update_business: "/api/auth/business-locations/",
    delete_business: "/api/auth/business-locations/",

    // Family Endpoint
    get_all_family: "/api/auth/get-families",
    add_family: "/api/auth/families",
    update_family: "/api/auth/families/",
    delete_family: "/api/auth/families/",
    get_members: "/api/auth/families/",

    // Client Endpoint
    get_all_clients: "/api/auth/get-clients",
    add_client: "/api/auth/clients",
    get_clients: "/api/auth/clients/",
    delete_clients: "/api/auth/clients/",
    edit_clients: "/api/auth/clients/",
    create_notes: "/api/auth/clients/",
    update_notes: "/api/auth/clients/update-notes",
    delete_notes: "/api/auth/clients/",
    allClentBasedToLocation: "/api/auth/eager-load-clients",
    get_notes: "/api/auth/clients/get-notes?clients_id=",

    // Documents Endpoint
    get_all_document: "/api/auth/documents?client_id=",
    add_document: "/api/auth/documents",
    update_document: "/api/auth/documents/",
    delete_document: "/api/auth/documents/",

    get_all_family: "/api/auth/get-families",
    add_client: "/api/auth/clients",
    get_notif: "/api/auth/notif-user",

    // Identifield patient
    get_patient: "/api/auth/get-identified-clients",

    // Download
    download_files: "/api/auth/download?file=",

    // Get All identified Patient
    get_all_identified_patient: "/api/auth/get-identified-clients",

    // create instant family
    create_family: "/api/auth/clients-to-family",
  },
};
