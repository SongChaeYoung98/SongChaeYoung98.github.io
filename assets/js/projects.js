$(document).ready(() => {
    render_projects('featured');
})


let render_projects = (slug) => {
    let projects_area = $('.projects-wrapper');

    $('.white-button').removeClass('white-button-hover');
    $(`#${slug}`).addClass('white-button-hover');

    let projects_obj = [
        {
            image: 'assets/images/wheat-predict.PNG',
            link: 'https://github.com/SongChaeYoung98/prediction-of-wheat-cultivating-areas',
            title: '미래의 밀 경작 가능지 예측',
            demo: false,
            technologies: ['Jupyter', 'Random Forest', 'Python'],
            description: "Flask web application for easy reporting updates to one's mentor. Multi-user support, easy to deploy and use.",
            categories: ['featured', 'all']
        },
        {
            image: 'assets/images/household-account.PNG',
            link: 'https://github.com/SongChaeYoung98/household-account',
            title: '안드로이드 가계부 앱',
            demo: false,
            technologies: ['Android Studio', 'JAVA'],
            description: "A modern Jekyll theme with grid frontpage, beautiful typography, mobile responsive, made with Semantic UI.",
            categories: ['featured', 'native']
        },
        {
            image: 'assets/images/voice-analysis.PNG',
            link: 'https://github.com/SongChaeYoung98/voice-emotion-analysis',
            title: '음성을 통한 감정 분석',
            demo: false,
            technologies: ['Pycharm', 'BLSTM', 'Python'],
            description: "Attendance marking tool that uses face recognition for marking attendance and firebase for tracking and analytics.",
            categories: ['featured', 'webdev']
        },
        {
            image: 'assets/images/mpw.jpg',
            link: 'https://github.com/abhn/mpw',
            title: '표정을 통한 감정 분석',
            demo: 'https://www.nagekar.com/mpw',
            technologies: ['Pycharm', 'OpenCV', 'RNN', 'Python'],
            description: "Master Password is an ingenious password solution that makes your passwords truly impossible to lose.",
            categories: ['featured', 'webdev']
        },
        
    ]

    let projects = [];
    if(slug == 'featured') {
        projects = projects_obj.map(project_mapper);
    } 
    else {
        projects = projects_obj.filter(project => project.categories.includes(slug)).map(project_mapper);
    }
    projects_area.hide().html(projects).fadeIn();
}

let project_mapper = project => {
    return `
        <div class="wrapper">
                
            <div class="card radius shadowDepth1">

                ${project.image ? 
                    `<div class="card__image border-tlr-radius">
                        <a href="${project.link}">
                            <img src="${project.image}" alt="image" id="project-image" class="border-tlr-radius">
                        </a>
                    </div>`           
                : ''}

        
                <div class="card__content card__padding">
        
                    <article class="card__article">
                        <h2><a href="${project.link}">${project.title}</a></h2>
        
                        <p class="paragraph-text-normal">${project.description} ${project.demo ? `<a href="${project.demo}">Demo</a>` : ''}</p>
                    </article>

                                
                    <div class="card__meta">
                        ${project.technologies.map(tech =>
                            `<span class="project-technology paragraph-text-normal">${tech}</span>`
                        ).join('')}
                    </div>

                </div>
            </div>
        </div>
    `
}

let selected = (slug) => {
    render_projects(slug);
}