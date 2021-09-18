cmake_minimum_required(VERSION 3.8)

option(APP_NAME "Project Name" "SDKBoxSample")
project(${APP_NAME} CXX)

include(${CMAKE_CURRENT_LIST_DIR}/../common/CMakeLists.txt)


set(LIB_NAME cocos)

set(PROJ_SOURCES
    ${CMAKE_CURRENT_LIST_DIR}/../common/Classes/Game.h
    ${CMAKE_CURRENT_LIST_DIR}/../common/Classes/Game.cpp
    ${CMAKE_CURRENT_LIST_DIR}/jni/main.cpp
)


if(NOT EXISTS ${CMAKE_CURRENT_LIST_DIR}/../common/Classes/jsb_module_register.cpp)
    file(COPY "${COCOS_X_PATH}/cocos/bindings/manual/jsb_module_register.cpp"
        DESTINATION ${CMAKE_CURRENT_LIST_DIR}/../common/Classes/)
endif()


# -------------- SRART ---------------
# USED BY COCOS SERVICE, DON'T REMOVE!
if(EXISTS ${RES_DIR}/proj/service.cmake)
    set(SERVICE_NATIVE_DIR ${CMAKE_CURRENT_LIST_DIR})
    include(${RES_DIR}/proj/service.cmake)
endif()
# --------------  END ----------------

# source-IAP
list(APPEND PROJ_SOURCES
${CMAKE_CURRENT_LIST_DIR}/../common/Classes/PluginIAPJS.cpp
${CMAKE_CURRENT_LIST_DIR}/../common/Classes/PluginIAPJSHelper.cpp
)
# source-sdkbox
list(APPEND PROJ_SOURCES ${CMAKE_CURRENT_LIST_DIR}/../common/Classes/SDKBoxJSHelper.cpp)
list(APPEND PROJ_SOURCES
    ${CMAKE_CURRENT_LIST_DIR}/../common/Classes/jsb_module_register.cpp
)

add_library(${LIB_NAME} SHARED ${PROJ_SOURCES})
# sdkbox-config
file(COPY "${CMAKE_CURRENT_LIST_DIR}/../common/assets/sdkbox_config.json" DESTINATION ${RES_DIR}/assets/)


# -------------- SRART ---------------
# USED BY COCOS SERVICE, DON'T REMOVE!
if(COMMAND service_insert_library)
    service_insert_library()
endif()
# --------------  END ----------------

# PluginIAP
add_definitions(-DSDKBOX_ENABLED)
add_subdirectory(${CMAKE_CURRENT_LIST_DIR}/app/jni/PluginIAP/)
target_link_libraries(${LIB_NAME} ext_PluginIAP)
# lib-sdkbox
add_definitions(-DSDKBOX_ENABLED)
add_subdirectory(${CMAKE_CURRENT_LIST_DIR}/app/jni/sdkbox/)
target_link_libraries(${LIB_NAME} ext_sdkbox)
target_link_libraries(${LIB_NAME}
    "-Wl,--whole-archive" cocos2d_jni "-Wl,--no-whole-archive"
    cocos2d
)

target_include_directories(${LIB_NAME} PRIVATE
    ${CMAKE_CURRENT_LIST_DIR}/../common/Classes
)
