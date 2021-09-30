export default {
    baseUrl: 'http://localhost:3000/MOCKAPI/',
    end: '.json',
    stories: 'ecodwp/api/SpotLight/getRiseStoriesInnerPage',
    getAllStories: 'ecodwp/api/SpotLight/getAllRiseStories',

    // announcments
    getAnnouncments: 'ecodwp/api/SpotLight/getOrgAnnouncementInnerPage',



    // leader corner 
    getLeaderCorner: 'ecodwp/api/LeaderCorner/getTopLeader',


    // quick wish
    getQuickWish: 'ecodwp/api/EmployeeCorner/employeeCornerPage',

    //workspace
    getWorkSpace: 'ecodwp/api/SpotLight/getUserOtherWidgets',

    // GetInTOuch

    getHrContact: (id) => `ecodwp/api/Hrdesk/getHrdeskData/${id}`
}