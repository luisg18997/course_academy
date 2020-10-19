import { IResolvers } from 'graphql-tools';
import { database } from '../data/data.store';
import _ from 'lodash';

const mutation: IResolvers = {
    Mutation: {
        courseAdd(__: void, {course}): any {
            const itemCourse = {
                id: String(database.courses.length + 1),
                title: course.title,
                description: course.description,
                clases: course.clases,
                time:  course.time,
                level: course.level,
                logo: course.logo,
                path: course.path,
                teacher: course.teacher,
                reviews: []
            }
            database.courses.push(itemCourse);
            return itemCourse;
        },
        courseUpdate(__: void, {course}): any {
            const isElement = _.findIndex(database.courses, (o) => {
                return o.id === course.id
            })
            if(isElement > -1) {
                const ratings = database.courses[isElement].reviews;
                course.reviews = ratings;
                database.courses[isElement] = course;
                return course;
            }
            return {
                id: '-1',
                title: `course not found by id ${course.id}`,
                description: '',
                clases: -1,
                time: 0.0,
                level: 'ALL',
                path: '',
                teacher: '',
                logo: '',
                reviews: []

            }
        },
        courseDelete(__: void, {id}): any {
            const isElement = _.remove(database.courses, (course) => {
                return course.id === id
            })
            if(!isElement[0]) {
                return {
                    id: '-1',
                    title: `course not found by id ${id}`,
                    description: '',
                    clases: -1,
                    time: 0.0,
                    level: 'ALL',
                    path: '',
                    teacher: '',
                    logo: '',
                    reviews: []
    
                }
            }
            return isElement[0]
        }
    }
}

export default mutation;