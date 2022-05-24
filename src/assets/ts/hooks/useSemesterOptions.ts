import {ElementCascaderOption, LanguageOptions} from "../types";

function getGradeNames(language: LanguageOptions) {
    switch (language) {
        case "en":
            return ["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Master 1", "Master 2", "Master 3"];
        case "fr":
            return ["Année 1", "Année 2", "Année 3", "Année 4", "Année 5", "Année 6", "Année 7"];
        case "zh":
            return ["大一", "大二", "大三", "大四", "研一", "研二", "研三"];
    }
}

function getSemesterNames(language: LanguageOptions) {
    let _nameList: string[] = [];
    for (const gradeName of getGradeNames(language)) {
        _nameList = _nameList.concat([gradeName, gradeName]);
    }
    return _nameList;
}

export function getSemesterElOptions(language: LanguageOptions): ElementCascaderOption[] {
    let _options: ElementCascaderOption[] = [];
    for (let [index, semesterName] of getSemesterNames(language).entries()) {
        _options.push({
            value: index + 1,
            label: semesterName,
        });
    }
    return _options;
}

export default function useSemesterOptions() {
    return {
        getGradeNames,
        getSemesterNames,
        getSemesterElOptions,
    };
};